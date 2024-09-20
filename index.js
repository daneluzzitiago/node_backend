const express = require("express");
const firebaseAdmin = require('firebase-admin');
const firestoreCredential = require('./gymbo-firebase-adminsdk-skfo3-76710d743a.json');
require('dotenv').config();

firebaseAdmin.initializeApp({ credential: firebaseAdmin.credential.cert(firestoreCredential)});

const db = firebaseAdmin.firestore();
module.exports = db;

const app = express();
const port = 8080;


app.use(express.json());

const userRoutes = require('./src/routes/userRoutes');

app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`Server running at ${port}`);
})