const mongoose = require('mongoose');
const db = require('./index.js');
// db = mongoose.connection; at mongodb://localhost:27017/myapp
mongoose.Promise = global.Promise;

const doctorSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
