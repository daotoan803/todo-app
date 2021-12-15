const mongoose = require('mongoose')

exports.connect = async () => {
  const uri = 'mongodb+srv://todo:todo@cluster0.43ro9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  await mongoose.connect(uri);
  return 'connected to mongodb';
}