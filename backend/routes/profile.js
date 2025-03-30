const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

router.get('/profile', verifyToken, async (req, res) => {
  try {
    // If the token is valid, user data can be accessed via req.user
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ username: user.username });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

module.exports = router;
