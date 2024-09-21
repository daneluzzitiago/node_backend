const db = require('../db');

const docRef = () => db.collection('node_backend_data');

exports.getUserByEmail = async (email) => {
  try {
    const user = await docRef().where("email", "==", email).get();
    return user;
  } catch (err) {
    console.log(err);
  }

}

exports.getAllUsers = async () => {
  try {
    const response = [];
    const snapshotData = await docRef().get();
    snapshotData.forEach((doc) => response.push(doc.data()));
    return response;
  } catch (err) {
    console.log(err);
  }
}

exports.createUser = async (data) => {
  const email = data.email;
  const user = await this.getUserByEmail(email);
  if (user) {
    throw {
      status: 400,
      message: `User with email ${email} already exists`
    }
  }
  try {
    await docRef().add(data);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

exports.updateUser = async () => { }

exports.deleteUser = async () => { }
