const mongoose = require('mongoose');

exports.User = mongoose.model('users', {
  username: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
