const express = require('express')

const routes = express.Router();

const LoginController = require('./controllers/LoginController');
const AppointmentController = require('./controllers/AppointmentController');
const SingleAppointment = require('./controllers/SingleAppointment');
const UserController = require('./controllers/UserController');
const AllUsersController = require('./controllers/AllUsersController');

routes.get('/', (req, res) => {
    return res.json({message: "Hello world"})
})

routes.post('/user/create', UserController.store);

routes.post('/user', UserController.index);

routes.get('/allusers', AllUsersController.index);

routes.post('/login', LoginController.index);

routes.post('/appointment/create', AppointmentController.store);

routes.post('/appointment', AppointmentController.index);

routes.post('/appointment/edit', AppointmentController.update);

routes.post('/appointment/getone', SingleAppointment.index);

module.exports = routes;