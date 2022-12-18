const mongoose = require('mongoose')

//this is just to remove the warnings
mongoose.set('strictQuery', false);

const connectDB = (url) => {
  return mongoose.connect(url)
}

module.exports = connectDB
