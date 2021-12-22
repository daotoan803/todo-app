const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.validateInput = (req, res, next) => {
  let { username, password } = req.body;
  const minLength = 3;
  const maxLength = 20;

  username = username?.trim();
  password = password?.trim();

  req.body.username = username;
  req.body.password = password;

  let error = {};
  if (!username || username.length < minLength || username.length > maxLength)
    error.username = `Username must be ${minLength}-${maxLength} characters long`;

  if (!password || password.length < minLength || password.length > maxLength)
    error.password = `Password must be ${minLength}-${maxLength} characters long`;

  if (error.username || error.password) {
    return res.status(400).json({ error });
  }

  next();
};

exports.createUser = async (req, res) => {
  const { username, password } = req.body;

  const usernameIsExists = await User.findOne({ username });

  if (usernameIsExists) {
    return res.status(407).json({ error: 'Username already exists' });
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
