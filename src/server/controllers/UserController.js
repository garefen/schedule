const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const user = await User.find({});

        return res.json(user)
    },

    async store(req, res) {
        const { email, password, name } = req.body;

        const userExists = await User.findOne({email});

        if (userExists) {
            return res.json(userExists);
        }

        const user = await User.create({
            email,
            password,
            name
        });
        return res.json(user);
    }
}