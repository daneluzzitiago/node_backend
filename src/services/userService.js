import emailConfig from '../config';
import { createTransport } from 'nodemailer';
import { getAllUsers, getUserByEmail, createUser } from '../repositories/userRepository';

const transporter = createTransport(emailConfig);

const requiredFields = ['name', 'admin', 'phone', 'email'];

export async function getAllUsers() {
  return getAllUsers();
}

export async function findUser(email) {
  return getUserByEmail(email);
}

export async function addNewUser(userData) {
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
    const newUser = await createUser(userData);
    return newUser;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function login(email) {
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