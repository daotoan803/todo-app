const mongoose = require('mongoose');

const Task = mongoose.model('tasks', {
  userId: {
    type: String,
    required: true,
  },
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

module.exports = Task;
