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

  const key = process.env.ACCESS_TOKEN_KEY;
  console.log(key);

  const accessToken = jwt.sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_KEY,
    {
      expiresIn: '30d',
    }
  );
  res.json({ accessToken });
};
