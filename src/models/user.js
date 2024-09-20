const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    password: { type: String, unique: true },
    email: String,
    age: Number,
});

module.exports = mongoose.model('User', userSchema)