const Appointment = require('../models/Appointment');

const constrains = require('../constrais');

module.exports = {
    async index(req, res) {
        const { userId } = req.body;

        const appointment = await Appointment.find({
            userId
        });

        return res.json(appointment);
    },

    async store(req, res) {
        
        const { name, userId, date } = req.body;

        const newDate = new Date(date);
        const month = constrains.months[newDate.getMonth()];
        const day = newDate.getDate();
        const weekday = constrains.week[newDate.getDay()];
        const hrs = newDate.getHours();
        let minutes = newDate.getMinutes();

        if (minutes.toString().length < 2) {
            minutes = "0" + minutes.toString();
        }
        const hour = `${hrs}:${minutes}`;

        const appointment = await Appointment.create({
            name,
            hour,
            day,
            month,
            userId,
            weekday
        });

        return res.json(appointment);
    },

    async update(req, res) {
        const { name, id, date } = req.body;

        const newDate = new Date(date);
        const month = constrains.months[newDate.getMonth()];
        const day = newDate.getDate();
        const weekday = constrains.week[newDate.getDay()];
        const hrs = newDate.getHours();
        let minutes = newDate.getMinutes();

        if (minutes.toString().length < 2) {
            minutes = "0" + minutes.toString();
        }
        const hour = `${hrs}:${minutes}`;

        const appointment = await Appointment.findByIdAndUpdate(id, {
            name,
            hour,
            day,
            month,
            weekday
        });

        return res.json(appointment);
    },

    async delete(req, res) {
        const { id } = req.body;

        const appointment = await Appointment.findByIdAndDelete(id);

        return res.json(appointment);
    }
}