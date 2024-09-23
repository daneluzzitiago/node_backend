import { getAllUsers, findUser, addNewUser, login } from '../services/userService';

export async function getUsers(req, res) {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
}

export async function getUserInfo(req, res) {
  try {
    const email = req.body.email;
    const user = await findUser(email);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
}

export async function addUser(req, res) {
  try {
    const docId = await addNewUser(req.body);
    return res.status(200).json({ docId: docId });
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).json({ message: err.message, fields: err.missingFields });
  }
}

export async function startLogin(req, res) {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({ message: "Request need an email " });
    }
    const user = await findUser(email);
    if (!user) {
      return res.status(404).json({ message: `User with email ${email} was not found` });
    }
    const result = await login(email);
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
}