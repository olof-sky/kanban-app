const express = require('express');
const cors = require('cors');
const taskService = require('./projectTask.service');
const router = express.Router();
const validateUser = require('../../../middleware/verifyToken');
const verifyUserProjectAccess = require('../../../middleware/verifyUserProjectAccess');
router.use(cors());
router.use(express.json({
  type: 'application/json',
}))
router.use(
  express.urlencoded({
    extended: true,
  })
);


/* CREATE task. */
router.post('/create', validateUser, verifyUserProjectAccess, async function(req, res, next) {
  try {
    const response = await taskService.create(req.body, res.user.user_id);
    return res.status(200).json({"Success": "Successfully created task", response});
  } catch (err) {
    console.error(err, `Error while creating task `, err.message);
    next(err);
  }
});

/* GET tasks. */
router.get('/getMultipleByProject/:id', validateUser, verifyUserProjectAccess, async function(req, res, next) {
  try {
    return res.json(await taskService.getMultipleByProject(req.params.id));
  } catch (err) {
    console.error(`Error while getting task `, err.message);
    next(err);
  }
});

/* GET task by id. */
router.get('/getById/:id', validateUser, verifyUserProjectAccess, async function(req, res, next) {
  try {
    let response = res.json(await taskService.getById(req.params.id, res))
    return response;
  } catch (err) {
    console.error(`Error while getting task with id: ${req.params.id} `, err.message);
    next(err);
  }
});

/* DELETE task. */
router.delete('/deleteTask/:id', validateUser, async function(req, res, next) {
  try {
    res.json(await taskService.deleteTask(req.params.id, res.user.user_id, res));
  } catch (err) {
    console.error(`Error while deleting task `, err.message);
    next(err);
  }
});


module.exports = router;