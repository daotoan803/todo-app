const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.validateInput = (req, res, next) => {
  const { username, password } = req.body;

  let error = {};
  if (!username || username.trim().length < 3 || username.includes(' '))
    error.username =
      'Username must be at least 3 characters and not contains spaces';

  if (!password || password.trim().length < 3)
    error.password =
      'Password must be at least 3 characters and not contains spaces';

  if (error.username || error.password) {
    return res.status(400).json({ error });
  }

  next();
};

exports.createUser = async (req, res) => {
  const { username, password } = req.body;

  const usernameIsExists = await User.findOne({ username });

  if (usernameIsExists) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password.trim(), 10);
  try {
    await User.create({ username, password: hashedPassword });
    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({ error: 'something happen try again later' });
    console.error(e);
  }
};
