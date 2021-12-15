const mongoose = require('mongoose');

exports.Task = mongoose.model('tasks', {
  title: {
    type: String,
    trim: true,
    required: true,
  },
  detail: {
    type: String,
    trim: true,
    required: true,
  },
  state: {
    type: Boolean,
    default: false,
  },
});
