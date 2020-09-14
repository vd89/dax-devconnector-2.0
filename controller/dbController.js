/** @format */

const { connect } = require('mongoose');
const config = require('config');

const uri = config.get('mongoURI');
const mongoOpt = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const dbController = async () => {
  try {
    await connect(uri, mongoOpt);
    console.log(`Database is connected to the server 🚀 🚀`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbController;
