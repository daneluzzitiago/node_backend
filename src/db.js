import { initializeApp, credential as _credential, firestore } from 'firebase-admin';
import firestoreCredential from '../gymbo-firebase-adminsdk-skfo3-76710d743a.json';

initializeApp({ credential: _credential.cert(firestoreCredential) });

const db = firestore();
export default db;