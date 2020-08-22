const mongoose = require('mongoose');
const db = require('./index.js');
// db = mongoose.connection; at mongodb://localhost:27017/myapp
mongoose.Promise = global.Promise;

const appointmentSchema = new mongoose.Schema(
  {
    patientName: String,
    doctorName: String,
    date: String,
    time: String,
    kind: String,
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
