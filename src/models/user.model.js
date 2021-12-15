const mongoose = require('mongoose');

const User = mongoose.model('users', {
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = User;
