const express = require('express');
const cors = require('cors');
const user = require('../services/user');
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
    res.json(await user.create(req));
  } catch (err) {
    console.error(`Error while creating user `, err.message);
    next(err);
  }
});

/* GET users. */
router.get('/getMultiple', async function(req, res, next) {
  try {
    res.json(await user.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

/* GET user by id. */
router.get('/getById/:id', async function(req, res, next) {
  let userId = req.params.id;
  try {
    res.json(await user.getById(userId));
  } catch (err) {
    console.error(`Error while getting user with id: ${userId} `, err.message);
    next(err);
  }
});

/* UPDATE users first name. { userFirstName } */
router.put('/updateUserFirstName/:id', async function(req, res, next) {
  let userId = req.params.id;
  try {
    res.json(await user.updateUserFirstName(req, userId));
  } catch (err) {
    console.error(`Error while updating user `, err.message);
    next(err);
  }
});

/* UPDATE user last name. { UserLastName } */
router.put('/updateUserLastName/:id', async function(req, res, next) {
  let userId = req.params.id;
  try {
    res.json(await user.updateUserLastName(req, userId));
  } catch (err) {
    console.error(`Error while updating user `, err.message);
    next(err);
  }
});

/* DELETE user. */
router.delete('/deleteUser/:id', async function(req, res, next) {
  let userId = req.params.id;
  try {
    res.json(await user.deleteUser(userId));
  } catch (err) {
    console.error(`Error while deleting user `, err.message);
    next(err);
  }
});


module.exports = router;