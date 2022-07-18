const express = require('express');
const router = express.Router();
const project = require('../services/project');

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

/* CREATE project. */
router.post('/create', async function(req, res, next) {
  let newProject = req.body
  try {
    res.send(await project.create(newProject));
    res.json(await project.create(newProject));
  } catch (err) {
    console.error(`Error while creating project `, err.message);
    next(err);
  }
});

module.exports = router;