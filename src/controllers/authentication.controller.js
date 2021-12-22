const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_KEY =
  '89103167bc526750b32da3b7fbaa3090a06f9eb8a6bb1cfe5c61c46c667d07b571967b783b453f8ecbba753a8c50b7b5d8ea14fba7483a8d600740c6409315f9';

exports.login = async (req, res) => {
  const { userId } = req;
  if (userId) return res.status(400).json({ error: 'already logged in' });
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user)
    return res.status(400).json({ error: 'Wrong username or password' });

  const passwordIsCorrect = await bcrypt.compare(password, user.password);
  if (!passwordIsCorrect)
    return res.status(400).json({ error: 'Wrong username or password' });

  const accessToken = jwt.sign(
    {
      userId: user.id,
      username: user.username,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
    },
    ACCESS_TOKEN_KEY
  );
  res.json({ accessToken, username: user.username });
};

exports.authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Not logged in' });

  jwt.verify(token, ACCESS_TOKEN_KEY, (err, tokenObj) => {
    if (err) return res.sendStatus(403);
    req.userId = tokenObj.userId;
    next();
  });
};

exports.checkValidToken = (req, res) => {
  res.sendStatus(200);
};
