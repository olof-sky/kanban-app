const express = require('express');
const cors = require('cors');
const verifyUserToken = require('../../../middleware/verifyToken');
const UserService = require('./user.service');
const router = express.Router();
router.use(cors());
router.use(express.json({
  type: 'application/json',
}))
router.use(
  express.urlencoded({
    extended: true,
  })
);


/******* 
Create new user CURL cmd
curl -H "Content-Type: application/json" -d '{"email":"olof@gmail.com", "password_hash":"olofschylander", "first_name":"Olof", "last_name":"Schylander","role":"User"}' http://localhost:3002/api/v1/user/create
*******/

/* CREATE user. */
router.post('/create', async function(req, res, next) {
  try {
    const response = await UserService.create(req.body, res);
    return res.status(200).json({"Success": "Successfully created user", response});
  } catch (err) {
    console.log(err, `Error while creating user `);
  }
});

/* GET users. */
router.get('/getMultiple', verifyUserToken, async function(req, res, next) {
  // Logged in users ID === res.user.user_id
  try {
    res.json(await UserService.getMultiple());
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    res.status(400).json(`Error while getting users `, err.message);
  }
});

/* GET logged in user by id. */
router.get('/getLoggedInUser', verifyUserToken, async function(req, res, next) {
  try {
    res.json(await UserService.getLoggedInUser(res.user.user_id));
  } catch (err) {
    console.error(`Error while getting user with id: ${req.params.id} `, err.message);
    next(err);
  }
});

/* GET user by id. */
router.get('/getById/:id', async function(req, res, next) {
  try {
    res.json(await UserService.getById(req.params.id));
  } catch (err) {
    console.error(`Error while getting user with id: ${req.params.id} `, err.message);
    next(err);
  }
});

router.get('/getByEmail', async function(req, res, next) {
  try {
    res.json(await UserService.getByEmail(req.query));
  } catch (err) {
    console.error(`Error while getting user with email: ${req.query.email} `, err.message);
    next(err);
  }
});

/* UPDATE users first name. */
router.put('/updateUserFirstName/:id', async function(req, res, next) {
  try {
    res.json(await UserService.updateUserFirstName(req.params.id, req.query));
  } catch (err) {
    console.error(`Error while updating user `, err.message);
    next(err);
  }
});

/* UPDATE user last name. */
router.put('/updateUserLastName/:id', async function(req, res, next) {
  try {
    res.json(await UserService.updateUserLastName(req.params.id, req.query));
  } catch (err) {
    console.error(`Error while updating user `, err.message);
    next(err);
  }
});

/* DELETE user. */
router.delete('/deleteUser/:id', async function(req, res, next) {
  try {
    res.json(await UserService.deleteUser(req.params.id));
  } catch (err) {
    console.error(`Error while deleting user `, err.message);
    next(err);
  }
});


module.exports = router;