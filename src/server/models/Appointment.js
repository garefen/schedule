const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    name: String,
    hour: String,
    day: Number,
    month: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);