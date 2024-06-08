require('dotenv').config();
const mongoose = require('mongoose');

const mongoURL = process.env.DB_URI;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('connected to mongoose');
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectToMongo;
