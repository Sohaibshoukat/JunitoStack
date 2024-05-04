const mongoose = require('mongoose');

const mongoURL = "mongodb+srv://sohaibshoukat94:Vg0Fnlp1nL8RK8H5@cluster0.elytalg.mongodb.net/Junito";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log('connected to mongoose');
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectToMongo;
