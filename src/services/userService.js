const db = require('../db');
const emailConfig = require('../config');
const nodemailer = require('nodemailer');
const userRepository = require('../repositories/userRepository');

const transporter = nodemailer.createTransport(emailConfig);

const requiredFields = ['name', 'admin', 'phone', 'email'];

exports.getAllUsers = async () => {
    return userRepository.getAllUsers();
}

exports.findUser = async (email) => {
    return userRepository.getUserByEmail(email);
}

exports.addNewUser = async (userData) => {
    const missingFields = [];
    requiredFields.forEach((field) => {
        if (!(field in userData)) {
            missingFields.push(field);
        }
    });
    if (missingFields.length > 0) {
        throw {
            status: 400,
            message: `Invalid request, missing required fields`,
            missingFields: missingFields,
        }
    }

    try {
        const newUser = await userRepository.createUser(userData);
        return newUser;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

exports.login = async (email) => {
    const options = {
        from: "contatogymbo@gmail.com",
        to: email,
        subject: "Seu código de verificação",
        text: "Seu código de verificação de login é: 1234",
    };

    try {
        const info = await transporter.sendMail(options);
        console.log(info.response);
        return info.response;
    } catch (err) {
        throw {
            status: 500,
            message: `Error sending email: ${err.message}`,
        }
    }
}