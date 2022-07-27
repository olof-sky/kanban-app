const express = require('express');
const cors = require('cors');
const projectService = require('./project.service');
const router = express.Router();
const verifyUserToken = require('../../../middleware/verifyToken');
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
router.post('/create', verifyUserToken, async function(req, res, next) {
  try {
    res.json(await projectService.create(req.body, res.user.user_id));
  } catch (err) {
    console.error(`Error while creating project `, err.message);
    next(err);
  }
});

/* GET projects. */
router.get('/getMultiple', async function(req, res, next) {
  try {
    res.json(await projectService.getMultiple());
  } catch (err) {
    console.error(`Error while getting projects `, err.message);
    next(err);
  }
});

/* GET project by id. */
router.get('/getById/:id', async function(req, res, next) {
  try {
    res.json(await projectService.getById(req.params.id));
  } catch (err) {
    console.error(`Error while getting project with id: ${projectId} `, err.message);
    next(err);
  }
});

/* UPDATE project name. { projectName } */
router.put('/updateProjectName/:id', async function(req, res, next) {
  try {
    res.json(await projectService.updateProjectName(req.params.id, req.query));
  } catch (err) {
    console.error(`Error while updating project `, err.message);
    next(err);
  }
});

/* UPDATE project type. { projectType } */
router.put('/updateProjectType/:id', async function(req, res, next) {
  try {
    res.json(await projectService.updateProjectType(req.params.id, req.query));
  } catch (err) {
    console.error(`Error while updating project `, err.message);
    next(err);
  }
});

/* DELETE project. */
router.delete('/deleteProject/:id', async function(req, res, next) {
  try {
    res.json(await projectService.deleteProject(req.params.id));
  } catch (err) {
    console.error(`Error while deleting project `, err.message);
    next(err);
  }
});


module.exports = router;