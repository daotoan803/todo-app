const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ error: 'Wrong username or password' });
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.password);
  if (!passwordIsCorrect) {
    return res.status(400).json({ error: 'Wrong username or password' });
  }

  const accessToken = jwt.sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_KEY,
    { expiresIn: '30d' }
  );
  res.json({ accessToken });
};

exports.authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Not logged in' });

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, userId) => {
    if (err) return res.sendStatus(403);
    req.userId = userId;
    next();
  });
};
