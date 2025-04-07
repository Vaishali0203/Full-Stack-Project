const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middleware/auth');

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

router.put('/profile', verifyToken, async (req, res) => {
  try {
    const updateFields = { ...req.body };
    delete updateFields.username;

    const updatedUser = await User.findOneAndUpdate(
      { username: req.user.username },
      { $set: updateFields },
      { new: true }
    ).select('-password');

    res.status(200).json({ message: 'Profile updated', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

router.delete('/profile', verifyToken, async (req, res) => {
  try {
    await User.findOneAndDelete({ username: req.user.username });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

module.exports = router;
