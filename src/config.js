const emailConfig = {
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "contatogymbo@gmail.com",
        pass: process.env.GOOGLE_APP_PASSWORD
    }
};

module.exports = emailConfig;