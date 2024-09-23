import { collection } from '../db';

const docRef = () => collection('node_backend_data');

export async function getUserByEmail(email) {
  try {
    const user = await docRef().where("email", "==", email).get();
    return user;
  } catch (err) {
    console.log(err);
  }

}

export async function getAllUsers() {
  try {
    const response = [];
    const snapshotData = await docRef().get();
    snapshotData.forEach((doc) => response.push(doc.data()));
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function createUser(data) {
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

export async function updateUser() { }

export async function deleteUser() { }
