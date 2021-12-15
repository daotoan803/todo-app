const mongoose = require('mongoose');

exports.Task = mongoose.model(
  'tasks',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      default: 'unfinished',
    },
  })
);
