require('dotenv').config()
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const db = require('../../../helpers/db');
const bcrypt = require('bcryptjs');
const uuid = require("uuid");

// Route for creating a user
async function create(params, res) {
  //trim
  const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]/;
  const passwordValidation = /[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~\d]/;

  params.first_name = params.first_name.trim().charAt(0).toUpperCase() + params.first_name.trim().slice(1).toLowerCase();
  params.last_name = params.last_name.trim().charAt(0).toUpperCase() + params.last_name.trim().slice(1).toLowerCase();
  params.password = params.password.trim();

  // validate
  if (params.first_name === "") { return res.status(400).json({"FirstNameError": "First name can not be empty"})}
  if (params.last_name === "") { return res.status(400).json({"LastNameError": "Last name can not be empty"})}
  if (params.email === "") { return res.status(400).json({"EmailError": "Email can not be empty"})}
  if (params.password === "") { return res.status(400).json({"PasswordError": "Password can not be empty"})}

  if (params.first_name.match(specialChars)) {
    return res.status(400).json({"FirstNameError": 'First name is not valid'});
  }
  if (params.last_name.match(specialChars)) {
    return res.status(400).json({"LastNameError": 'Last name is not valid'});
  }
  if (await db.User.findOne({ where: { email: params.email } })) {
      return res.status(400).json({"EmailError": 'Email is already registered'});
  }
  if (!body(params.email).isEmail().normalizeEmail()) {
    return res.status(400).json({"EmailError": 'Email is not valid'});
  }
  if (params.password.length < 8 || params.password.length > 16) {
    return res.status(400).json({"PasswordError": 'Password must be 8-16 chars'});
  }
  if (!params.password.match(passwordValidation)) {
    return res.status(400).json({"PasswordError": 'Requires numbers/special characters'});
  }

  // hash password
  password_hash = await bcrypt.hash(params.password, 10);
  params.role = "User";
  const userId = uuid.v4();
  const refreshToken = jwt.sign({user_id: userId}, process.env.REFRESH_TOKEN_KEY);
  const user = new db.User({user_id: userId, email: params.email, password_hash: password_hash, first_name: params.first_name, last_name: params.last_name, role: params.role, refresh_token: refreshToken});
  // save user
  await user.save();
  return user;
}

// Get multiple users
async function getMultiple(){
  return await db.User.findAll();
}

// Get one user
async function getLoggedInUser(user_id){
  return await getUser(user_id);
}

// Get one user
async function getById(user_id){
  return await getUser(user_id);
}

async function getByEmail(params){
  return await db.User.findOne({ where: { email: params.email } });
}

async function updateUserFirstName(user_id, params) {

  const user = await getUser(user_id);
  const userFirstNameChanged = params.first_name;
  // copy params to user and save
  user.update({ first_name: userFirstNameChanged });
  await user.save();
}

async function updateUserLastName(user_id, params) {

  const user = await getUser(user_id);
  const userLastNameChanged = params.last_name;

  // copy params to user and save
  user.update({ last_name: userLastNameChanged });
  await user.save();
}

// Delete a user
async function deleteUser(user_id) {
  const user = await getUser(user_id);
  await user.destroy();
}

async function getUser(user_id) {
  const user = await db.User.findByPk(user_id);
  if (!user) throw 'User not found';
  return user;
}

module.exports = {
  create,
  getMultiple,
  getLoggedInUser,
  getById,
  getByEmail,
  updateUserFirstName,
  updateUserLastName,
  deleteUser,
}