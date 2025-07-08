const express = require('express');
const { auth, admin } = require('../middleware/auth');
const User = require('../models/user');
const router = express.Router();

router.get('/users', auth, admin, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

module.exports = router;