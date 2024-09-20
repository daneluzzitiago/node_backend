const db = require('../../index');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "contatogymbo@gmail.com",
        pass: process.env.GOOGLE_APP_PASSWORD
    }
})

const requiredFields = ['name', 'admin', 'phone'];

exports.getAllUsers = async () => {
    const snapshot = await db.collection('node_backend_data').get();
    const response = [];
    snapshot.forEach((doc) => response.push(doc.data()));
    return response;
}

exports.findUser = async (email) => {
    try {
        const docRef = db.collection('node_backend_data');
        const snapshot = await docRef.where("email", "==", email).get();
        if (snapshot.empty) {
            throw {
                status: 404,
            }
        }
        return snapshot.docs[0].data();

    } catch (err) {
        console.log("Error: ", err);
    }

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
    const docRef = await db.collection('node_backend_data').add(userData);
    return docRef.id;
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