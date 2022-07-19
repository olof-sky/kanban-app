const db = require('./db');
const uuid = require("uuid");
const helper = require('../../../helper');
const config = require('../../../config');

// Route for creating a user
async function create(content){
  const userId = uuid.v4();
  const userFirstName = await content.body.userFirstName;
  const userLastName = await content.body.userLastName;
  await db.query(`INSERT INTO user (user_id, user_first_name, user_last_name) VALUES ('${userId}', '${userFirstName}','${userLastName}')`);
  const meta = {
    userFirstName: userFirstName,
    userLastName: userLastName};
  
  return {
    meta
  }
}

// Get multiple users
async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(`SELECT * FROM user LIMIT ${offset},${config.listPerPage}`);
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

// Get one user
async function getById(userId){
  const rows = await db.query(`SELECT * FROM user WHERE user_id = ${userId}`);
  const data = helper.emptyOrRows(rows);
  const meta = {userId};
  
  return {
    data,
    meta
  }
}

// Update a user name
async function updateUserFirstName(request, userId){
  const userFirstName = await request.body.userFirstName;
  const data = await db.query(`UPDATE user SET user_first_name = '${userFirstName}' WHERE user_id = '${userId}'`);
  const meta = {
    userFirstName: userFirstName,
  };
  
  return {
    meta,
    data
  }
}

// Update a user type
async function updateUserLastName(request, userId){
  const userLastName = await request.body.userLastName;
  const data = await db.query(`UPDATE user SET user_last_name = '${userLastName}' WHERE user_id = '${userId}'`);
  const meta = {
    userLastName: userLastName,
  };
  return {
    meta,
    data
  }
}
    
// Delete a user
async function deleteUser(userId){
  const data = await db.query(`DELETE FROM user WHERE user_id = '${userId}'`);
  const meta = {
    userId: userId,
  };
  return {
    meta,
    data
  }
}

module.exports = {
  create,
  getMultiple,
  getById,
  updateUserFirstName,
  updateUserLastName,
  deleteUser,
}