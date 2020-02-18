require('dotenv');
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');

const EraseOldAppointmentsController = require('./controllers/EraseOldAppointmentsController');

const schedule = require('node-schedule');

schedule.scheduleJob('00 00 * * *', EraseOldAppointmentsController.index);

const app = express();
app.use(cors());

app.use(express.json());

mongoose.connect(`mongodb+srv://admin:admin@cluster0-ufmxa.gcp.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

app.use(routes);


app.listen(3333);
