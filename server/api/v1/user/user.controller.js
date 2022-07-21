const express = require('express');
const cors = require('cors');
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
curl -H "Content-Type: application/json" -d '{"userFirstName":"xyz","userLastName":"xyz"}' http://localhost:3002/api/v1/user/create 
*******/

/* CREATE user. { userFirstName, userLastName } */
router.post('/create', async function(req, res, next) {
  try {
    res.json(await UserService.create(req.body));
  } catch (err) {
    console.error(`Error while creating user `, err.message);
    next(err);
  }
});

/* GET users. */
router.get('/getMultiple', async function(req, res, next) {
  try {
    res.json(await UserService.getMultiple());
  } catch (err) {
    console.error(`Error while getting users `, err.message);
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

/* UPDATE users first name. { userFirstName } */
router.put('/updateUserFirstName/:id', async function(req, res, next) {
  try {
    res.json(await UserService.updateUserFirstName(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating user `, err.message);
    next(err);
  }
});

/* UPDATE user last name. { UserLastName } */
router.put('/updateUserLastName/:id', async function(req, res, next) {
  try {
    res.json(await UserService.updateUserLastName(req.params.id, req.body));
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