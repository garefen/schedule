const express = require('express')

const routes = express.Router();

const LoginController = require('./controllers/LoginController');
const AppointmentController = require('./controllers/AppointmentController');
const UserController = require('./controllers/UserController');

routes.get('/', (req, res) => {
    return res.json({message: "Hello world"})
})

routes.post('/user/create', UserController.store);

routes.post('/login', LoginController.index);

module.exports = routes;