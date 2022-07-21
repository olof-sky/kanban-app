const db = require('../../../helpers/db');
const bcrypt = require('bcryptjs');
const uuid = require("uuid");

// Route for creating a user

async function create(params) {
  // validate
  if (await db.User.findOne({ where: { email: params.email } })) {
      throw 'Email "' + params.email + '" is already registered';
  }

  const user = new db.User({user_id: uuid.v4(), email: params.email, password_hash: params.password_hash, first_name: params.first_name, last_name: params.last_name, role: params.role});
  // hash password
  user.passwordHash = await bcrypt.hash(params.password, 10);

  // save user
  await user.save();
}

// Get multiple users
async function getMultiple(){
  return await db.User.findAll();
}

// Get one user
async function getById(user_id){
  return await getUser(user_id);
}

async function updateUserFirstName(user_id, first_name) {

  const user = await getUser(user_id);
  const userFirstNameChanged = first_name;

  // copy params to user and save
  Object.assign(user.first_name, userFirstNameChanged);
  await user.save();
}

async function updateUserLastName(user_id, last_name) {

  const user = await getUser(user_id);
  const userLastNameChanged = last_name;

  // copy params to user and save
  Object.assign(user.last_name, userLastNameChanged);
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
  getById,
  updateUserFirstName,
  updateUserLastName,
  deleteUser,
}