const db = require('../../index');

const requiredFields = ['name', 'admin', 'phone'];

exports.getAllUsers = async () => {
    const snapshot = await db.collection('node_backend_data').get();
    const response = [];
    snapshot.forEach((doc) => response.push(doc.data()));
    return response;
}

exports.addNewUser = async (userData) => {
    const missingFields = [];
    requiredFields.forEach((field) => {
        if(!(field in userData)) {
            missingFields.push(field);
        }
    });
    if(missingFields.length > 0) {
        throw {
            status: 400,
            message: `Invalid request, missing required fields`,
            missingFields: missingFields,
        }
    }
    const docRef = await db.collection('node_backend_data').add(userData);
    return docRef.id;
}