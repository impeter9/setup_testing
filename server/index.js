const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');

const Doctors = require('../database/Doctor.js');
const Appointments = require('../database/Appointment.js');

const mongodb = require('mongodb');

const app = express();
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, '../public')));
// app.use(cors());

app.get('/getDoctors', function (req, res) {
  let callback = (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
    }
  };

  Doctors.find(callback);
});

app.get('/getAppointments', function (req, res) {
  // query params: firstName, lastName, date
  let callback = (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
    }
  };
  console.log(req.query);
  // Appointments.find(req.body, callback);
  const searchParam = {
    doctorName: req.query.lastName + ', ' + req.query.firstName,
    date: req.query.date,
  };
  Appointments.find(searchParam, callback);
});

app.post('/postAppointment', function (req, res) {
  // query params: patientFirstName, patientLastName, doctorFirstName, doctorLastName, date, time, kind
  console.log(req.query);
  const min = req.query.time.split(':')[1].substring(0, 2);
  if (min === '00' || min === '15' || min === '30') {
  } else {
    // time not in 15 min interval, return error
    res.status(400).send('Time not in 15 minutes intervals');
  }

  let firstCallback = (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      console.log(data);
      // if there exist more than 3 appointment on that slot, send error
      if (data.length >= 3) {
        // res
        //   .status(400)
        //   .send(`Can't have more than 3 appointments at a time slot`);
        throw new Error(`Can't have more than 3 appointments at a time slot`);
      }
    }
  };
  const firstSearchParam = {
    doctorName: req.query.doctorLastName + ', ' + req.query.doctorFirstName,
    date: req.query.date,
    time: req.query.time,
  };
  let secondCallback = (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
    }
  };
  const secondSearchParam = {
    patientName: req.query.patientLastName + ', ' + req.query.patientFirstName,
    doctorName: req.query.doctorLastName + ', ' + req.query.doctorFirstName,
    date: req.query.date,
    time: req.query.time,
    kind: req.query.kind,
  };

  Appointments.find(firstSearchParam, firstCallback).then(() => {
    let newAppointment = new Appointments(secondSearchParam);
    newAppointment.save(secondCallback).catch((error) => {
      console.log(error);
    });
  });
});

app.delete('/deleteAppointment', function (req, res) {
  // query params: id
  let callback = (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
    }
  };
  console.log(req.query.id);
  const searchParam = { _id: mongodb.ObjectId(req.query.id) };
  Appointments.deleteOne(searchParam, callback);
});

module.exports = app;
