const mongoose = require('mongoose');

exports.User = mongoose.model(
  'users',
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  })
);
