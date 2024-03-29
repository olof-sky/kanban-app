const express = require('express');
const cors = require('cors');
const projectService = require('./project.service');
const router = express.Router();
const validateUser = require('../../../middleware/verifyToken');
const validateUserProjectAccess = require('../../../middleware/verifyuserProjectAccess');
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
Create new project CURL cmd
curl -H "Content-Type: application/json" -d '{"projectName":"xyz","projectType":"xyz"}' http://localhost:3002/api/v1/project/create 
*******/

/* CREATE project. */
router.post('/create', validateUser, async function(req, res, next) {
  try {
    const response = await projectService.create(req.body, res.user.user_id);
    return res.status(200).json({"Project": response});
  } catch (err) {
    console.error(err, `Error while creating project `, err.message);
    next(err);
  }
});

/* GET projects. */
router.get('/getMultiple', validateUser, async function(req, res, next) {
  if (!res.user.role === "Admin") return;
  try {
    return res.json(await projectService.getMultiple());
  } catch (err) {
    console.error(`Error while getting projects `, err.message);
    next(err);
  }
});

/* GET projects. */
router.get('/getMultipleByUser', validateUser, async function(req, res, next) {
  const id = res.user.user_id
  try {
    res.json(await projectService.getMultipleByUser(id));
  } catch (err) {
    console.error(`Error while getting projects `, err.message);
    next(err);
  }
});

/* GET project by id. */
router.get('/getById/:id', validateUser, async function(req, res, next) {
  try {
    let response = res.json(await projectService.getById(req.params.id, res.user.user_id, res))
    return response;
  } catch (err) {
    console.error(`Error while getting project with id: ${req.params.id} `, err.message);
    next(err);
  }
});

/* UPDATE project name. { projectName } */
router.put('/updateProjectName/:id', validateUser, async function(req, res, next) {
  try {
    res.json(await projectService.updateProjectName(req.params.id, req.query));
  } catch (err) {
    console.error(`Error while updating project `, err.message);
    next(err);
  }
});

/* UPDATE project type. { projectType } */
router.put('/updateProjectType/:id', validateUser, async function(req, res, next) {
  try {
    res.json(await projectService.updateProjectType(req.params.id, req.query));
  } catch (err) {
    console.error(`Error while updating project `, err.message);
    next(err);
  }
});

/* UPDATE project name. { projectName } */
router.put('/updateProjectTaskStatus/:id', validateUser, validateUserProjectAccess, async function(req, res, next) {
  try {
    res.json(await projectService.updateProjectTaskStatus(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating project `, err.message);
    next(err);
  }
});

/* DELETE project. */
router.delete('/deleteProject/:id', validateUser, async function(req, res, next) {
  try {
    res.json(await projectService.deleteProject(req.params.id));
  } catch (err) {
    console.error(`Error while deleting project `, err.message);
    next(err);
  }
});


module.exports = router;