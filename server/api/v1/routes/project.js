const express = require('express');
const cors = require('cors');
const project = require('../services/project');
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
Create new project CURL cmd
curl -H "Content-Type: application/json" -d '{"projectName":"xyz","projectType":"xyz"}' http://localhost:3002/api/v1/project/create 
*******/

/* CREATE project. { projectName, projectType } */
router.post('/create', async function(req, res, next) {
  try {
    res.json(await project.create(req));
  } catch (err) {
    console.error(`Error while creating project `, err.message);
    next(err);
  }
});

/* GET projects. */
router.get('/getMultiple', async function(req, res, next) {
  try {
    res.json(await project.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting projects `, err.message);
    next(err);
  }
});

/* GET project by id. */
router.get('/getById/:id', async function(req, res, next) {
  let projectId = req.params.id;
  try {
    res.json(await project.getById(projectId));
  } catch (err) {
    console.error(`Error while getting project with id: ${projectId} `, err.message);
    next(err);
  }
});

/* UPDATE project name. { projectName } */
router.put('/updateProjectName/:id', async function(req, res, next) {
  let projectId = req.params.id;
  try {
    res.json(await project.updateProjectName(req, projectId));
  } catch (err) {
    console.error(`Error while updating project `, err.message);
    next(err);
  }
});

/* UPDATE project type. { projectType } */
router.put('/updateProjectType/:id', async function(req, res, next) {
  let projectId = req.params.id;
  try {
    res.json(await project.updateProjectType(req, projectId));
  } catch (err) {
    console.error(`Error while updating project `, err.message);
    next(err);
  }
});

/* DELETE project. */
router.delete('/deleteProject/:id', async function(req, res, next) {
  let projectId = req.params.id;
  try {
    res.json(await project.deleteProject(projectId));
  } catch (err) {
    console.error(`Error while deleting project `, err.message);
    next(err);
  }
});


module.exports = router;