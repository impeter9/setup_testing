const mongoose = require('mongoose');
const db = require('./index.js');
const Doctor = require('./Doctor.js');
const Appointment = require('./Appointment.js');

// doctor data
const doctorList = [
  {
    name: 'Hibbert, Julius',
  },
  {
    name: 'Krieger, Algernop',
  },
  {
    name: 'Riviera, Nick',
  },
];

// appointment data
const appointmentList = [
  {
    patientName: 'Archer, Sterling',
    doctorName: 'Krieger, Algernop',
    date: '05/09/2018',
    time: '8:00AM',
    kind: 'New Patient',
  },
  {
    patientName: 'Cyril, Figis',
    doctorName: 'Krieger, Algernop',
    date: '05/09/2018',
    time: '8:30AM',
    kind: 'Follow-up',
  },
  {
    patientName: 'Ray, Gilette',
    doctorName: 'Krieger, Algernop',
    date: '05/09/2018',
    time: '9:00AM',
    kind: 'Follow-up',
  },
  {
    patientName: 'Lana, Kane',
    doctorName: 'Krieger, Algernop',
    date: '05/09/2018',
    time: '9:30AM',
    kind: 'New Patient',
  },
  {
    patientName: 'Pam, Poovey',
    doctorName: 'Krieger, Algernop',
    date: '05/10/2018',
    time: '10:00AM',
    kind: 'New Patient',
  },
  {
    patientName: 'fake',
    doctorName: 'Krieger, Algernop',
    date: 'fake',
    time: 'fake',
    kind: 'fake',
  },
];

const insertData = function () {
  // first time seeding
  Doctor.create(doctorList)
    .then(Appointment.create(appointmentList))
    .then(() => {
      mongoose.disconnect();
      console.log('db disconnected');
    });

  // // erase data and re-seed
  // Doctor.collection
  //   .drop()
  //   .then(Doctor.create(doctorList))
  //   .then(Appointment.collection.drop())
  //   .then(Appointment.create(appointmentList))
  //   .then(() => {
  //     mongoose.disconnect();
  //     console.log('db disconnected');
  //   });
};

insertData();
