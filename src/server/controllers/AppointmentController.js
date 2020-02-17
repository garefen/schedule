const Appointment = require('../models/Appointment');

module.exports = {
    async index(req, res) {
        const { user } = req.body;

        const appointment = await Appointment.find({
            user
        });

        return res.json(appointment);
    },

    async store(req, res) {
        const { name, hour, day, month, user } = req.body;

        const appointment = await Appointment.create({
            name,
            hour,
            day,
            month,
            user
        });

        return res.json(appointment);
    },

    async update(req, res) {
        const { id, name, hour, day, month } = req.body;

        const appointment = await Appointment.findByIdAndUpdate(id, {
            name,
            hour,
            day,
            month
        });

        return res.json(appointment);
    },

    async delete(req, res) {
        const { id } = req.body;

        const appointment = await Appointment.findByIdAndDelete(id);

        return res.json(appointment);
    }
}