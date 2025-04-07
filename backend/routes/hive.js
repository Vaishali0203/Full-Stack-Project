const express = require('express');
const router = express.Router();
const Hive = require('../models/Hive');
const Member = require('../models/Member');
const verifyToken = require('../middleware/auth');
const { nanoid } = require('nanoid');

router.post('/', verifyToken, async (req, res) => {
  const { name, shieldMode } = req.body;
  const stargateKey = nanoid(8);

  try {
    const hive = new Hive({
      name,
      stargateKey,
      shieldMode,
      queen: req.user._id,
      members: [{
        email: req.user.email,
        member: req.user._id,
        status: 'accepted',
        joinedAt: new Date()
      }]
    });

    await hive.save();
    res.status(201).json({ message: 'Hive created successfully', hive });
  } catch (err) {
    res.status(500).json({ message: 'Error creating Hive', error: err });
  }
});

router.post('/:hiveId/invite', verifyToken, async (req, res) => {
  const { email } = req.body;

  try {
    const hive = await Hive.findById(req.params.hiveId);
    if (!hive) return res.status(404).json({ message: 'Hive not found' });

    if (!hive.queen.equals(req.user._id)) {
      return res.status(403).json({ message: 'Only the Queen can send invitations' });
    }

    const alreadyInvited = hive.members.find(m => m.email === email);
    if (alreadyInvited) {
      return res.status(400).json({ message: 'User already invited or a member' });
    }

    const member = await Member.findOne({ email });

    hive.members.push({
      email,
      member: member ? member._id : null,
      status: 'sent'
    });

    await hive.save();

    const inviteLink = `http://localhost:3000/join/${hive.stargateKey}`;
    console.log(`📧 Send this invite link to ${email}: ${inviteLink}`);

    res.status(200).json({ message: 'Invitation created', inviteLink });
  } catch (err) {
    res.status(500).json({ message: 'Error sending invite', error: err });
  }
});

router.post('/accept/:key', verifyToken, async (req, res) => {
  try {
    const hive = await Hive.findOne({ stargateKey: req.params.key });
    if (!hive) return res.status(404).json({ message: 'Hive not found' });

    const memberEntry = hive.members.find(m => m.email === req.user.email);

    if (!memberEntry) {
      return res.status(403).json({ message: 'You have not been invited to this Hive' });
    }

    if (memberEntry.status === 'accepted') {
      return res.status(400).json({ message: 'Invite already accepted' });
    }

    memberEntry.status = 'accepted';
    memberEntry.member = req.user._id;
    memberEntry.joinedAt = new Date();

    await hive.save();

    res.status(200).json({ message: 'You’ve joined the Hive', hive });
  } catch (err) {
    res.status(500).json({ message: 'Error accepting invite', error: err });
  }
});

router.post('/:hiveId/crystals', verifyToken, async (req, res) => {
  const { title, url } = req.body;

  try {
    const hive = await Hive.findById(req.params.hiveId);
    if (!hive) return res.status(404).json({ message: 'Hive not found' });

    const isMember = hive.members.some(
      m => m.member?.toString() === req.user._id.toString() && m.status === 'accepted'
    );

    if (!isMember) {
      return res.status(403).json({ message: 'You are not a member of this Hive' });
    }

    hive.crystals.push({
      title,
      url,
      addedBy: req.user._id
    });

    await hive.save();
    res.status(200).json({ message: 'Crystal added successfully', crystals: hive.crystals });
  } catch (err) {
    res.status(500).json({ message: 'Error adding Crystal', error: err });
  }
});

router.get('/:hiveId', verifyToken, async (req, res) => {
  try {
    const hive = await Hive.findById(req.params.hiveId);

    if (!hive) return res.status(404).json({ message: 'Hive not found' });

    const isMember = hive.members.some(
      m => m.member?.toString() === req.user._id.toString() && m.status === 'accepted'
    );

    const isPublic = hive.shieldMode === 'public';

    if (!isPublic && !isMember) {
      return res.status(403).json({ message: 'This Hive is private' });
    }

    res.status(200).json(hive);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching Hive', error: err });
  }
});

module.exports = router;
