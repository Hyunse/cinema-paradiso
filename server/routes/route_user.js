const router = require('express').Router();
const User = require('../models/User');

router.get('/users', async (req, res) => {
  const users = await User.find();

  res.send({
    success: true,
    users
  });
})

module.exports = router;
