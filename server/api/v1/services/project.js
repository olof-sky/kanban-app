const db = require('./db');
const uuid = require("uuid");
const helper = require('../../../helper');
const config = require('../../../config');

// Route for creating a project
async function create(content){
  const projectId = uuid.v4();
  const projectName = await content.body.projectName;
  const projectType = await content.body.projectType;
  await db.query(`INSERT INTO project (project_id, project_name, project_type) VALUES ('${projectId}', '${projectName}','${projectType}')`);
  const meta = {
    projectName: projectName,
    projectType: projectType};
  
  return {
    meta
  }
}

// Get multiple projects
async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(`SELECT * FROM project LIMIT ${offset},${config.listPerPage}`);
  const data = helper.emptyOrRows(rows);
  const meta = {page};
  console.log(data)

  return {
    data,
    meta
  }
}

// Get one project
async function getById(projectId){
  const rows = await db.query(`SELECT * FROM project WHERE project_id = ${projectId}`);
  const project = helper.emptyOrRows(rows);
  const meta = {projectId};
  
  return {
    project,
    meta
  }
}

// Update a project name
async function updateProjectName(request, projectId){
  const projectName = await request.body.projectName;
  await db.query(`UPDATE project SET project_name = '${projectName}' WHERE project_id = '${projectId}'`);
  const meta = {
    projectName: projectName,
  };
  
  return {
    meta
  }
}

// Update a project type
async function updateProjectType(request, projectId){
  const projectType = await request.body.projectType;
  await db.query(`UPDATE project SET project_type = '${projectType}' WHERE project_id = '${projectId}'`);
  const meta = {
    projectType: projectType,
  };
  return {
    meta,
  }
}
    
// Delete a project
async function deleteProject(projectId){
  await db.query(`DELETE FROM project WHERE project_id = '${projectId}'`);
  const meta = {
    projectId: projectId,
  };
  return {
    meta,
  }
}

module.exports = {
  create,
  getMultiple,
  getById,
  updateProjectName,
  updateProjectType,
  deleteProject,
}