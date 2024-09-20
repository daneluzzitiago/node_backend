const userService = require('../services/userService');

exports.getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
};

exports.addUser = async (req, res) => {
    try {
        const docId = await userService.addNewUser(req.body);
        res.status(200).json({ docId: docId });
    } catch (err) {
        console.log(err.status);
        res.status(err.status).json({ message: err.message, fields: err.missingFields });
    }
}
