const db = require('../../../helpers/db');
const uuid = require("uuid");

// Route for creating a project

async function create(params, userId) {
  const projectId = uuid.v4() 
  const project = new db.Project({
    project_id: projectId, 
    project_name: params.project_name, 
    project_type: params.project_type, 
    project_admins: params.project_admins
  });
  // save project
  const userProject = new db.User_Projects({
    user_id: userId,
    project_id: projectId, 
  });
  await project.save();
  await userProject.save();
}

// Get multiple projects
async function getMultiple(){
  return await db.Project.findAll();
}

// Get one project
async function getById(project_id){
  return await getproject(project_id);
}

async function updateProjectName(project_id, params) {

  const project = await getproject(project_id);
  const projectNameChanged = params.project_name;

  // copy params to project and save
  project.update({ project_name: projectNameChanged });
  await project.save();
}

async function updateProjectType(project_id, params) {

  const project = await getproject(project_id);
  const projectTypeChanged = params.project_type;

  // copy params to project and save
  project.update({ project_type: projectTypeChanged });
  await project.save();
}

// Delete a project
async function deleteProject(project_id) {
  const project = await getproject(project_id);
  await project.destroy();
}

async function getproject(project_id) {
  const project = await db.Project.findByPk(project_id);
  if (!project) throw 'Project not found';
  return project;
}

module.exports = {
  create,
  getMultiple,
  getById,
  updateProjectName,
  updateProjectType,
  deleteProject,
}