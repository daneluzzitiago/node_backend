const firebaseAdmin = require('firebase-admin');
const firestoreCredential = require('../gymbo-firebase-adminsdk-skfo3-76710d743a.json');

firebaseAdmin.initializeApp({ credential: firebaseAdmin.credential.cert(firestoreCredential)});

const db = firebaseAdmin.firestore();
module.exports = db;