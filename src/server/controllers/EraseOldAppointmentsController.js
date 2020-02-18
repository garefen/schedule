const Appointment = require('../models/Appointment');

module.exports ={
    async index() {
        const datenow = new Date()

        const appointment = await Appointment.deleteMany({
            date: {
                $lt: datenow
            }
        });
    }
}