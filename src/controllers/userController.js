const userService = require('../services/userService');

exports.getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
};

exports.getUserInfo = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await userService.findUser(email);
        return res.status(200).json(user);
    } catch (err) {
        return res.status(err.status).json({ message: err.message });
    }
}

exports.addUser = async (req, res) => {
    try {
        const docId = await userService.addNewUser(req.body);
        return res.status(200).json({ docId: docId });
    } catch (err) {
        console.log(err);
        return res.status(err.status || 500).json({ message: err.message, fields: err.missingFields });
    }
};

exports.startLogin = async (req, res) => {
    try {
        const email = req.body.email;
        if(!email) {
           return res.status(400).json({ message: "Request need an email "});
        }
        const user = await userService.findUser(email);
        if(!user) {
            return res.status(404).json({ message: `User with email ${email} was not found`});
        }
        const result = await userService.login(email);
        return res.status(200).json({ result });
    } catch (err) {
        return res.status(err.status || 500).json({ message: err.message });
    }
};