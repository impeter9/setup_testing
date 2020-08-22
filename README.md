# setup_testing

## Setup to run locally

Clone repo to local machine.

From within the root directory of repo run the following commands to seed the Mongo database, build and spin up the server:

```sh
npm install
npm run db:setup
npm run build:dev
npm run server:dev
```

Navigate to link in a web browser.

> http://localhost:3000

Endpoints:

```sh
/getDoctors

/getAppointments
(query params: firstName, lastName, date)

/postAppointment
(query params: patientFirstName, patientLastName, doctorFirstName, doctorLastName, date, time, kind)

/deleteAppointment
(query params: id)
```

## Comment

App crashes when you try to add more than three appointments at a time slot, ran out of time before fixing that bug.

Frontend is incomplete.
