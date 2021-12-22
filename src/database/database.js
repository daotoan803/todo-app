const mongoose = require('mongoose');

exports.connect = async () => {
  const uri =
    process.env.MONGODB_URI
    'mongodb+srv://todo:todo@cluster0.43ro9.mongodb.net/todo_app?retryWrites=true&w=majority';
  await mongoose.connect(uri);
  return 'connected to mongodb';
};
