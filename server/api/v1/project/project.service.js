const db = require('../../../helpers/db');
const uuid = require("uuid");

// Route for creating a project

async function create(params) {
  console.log(params)
  const project = new db.Project({project_id: uuid.v4(), project_name: params.project_name, project_type: params.project_type, project_admins: params.project_admins});
  console.log(project)
  // save project
  await project.save();
}

// Get multiple projects
async function getMultiple(){
  return await db.Project.findAll();
}

// Get one project
async function getById(project_id){
  return await getproject(project_id);
}

async function updateProjectName(project_id, project_name) {

  const project = await getproject(project_id);
  const projectNameChanged = project_name;

  // copy params to project and save
  Object.assign(project.project_name, projectNameChanged);
  await project.save();
}

async function updateProjectType(project_id, project_type) {

  const project = await getproject(project_id);
  const projectTypeChanged = project_type;

  // copy params to project and save
  Object.assign(project.project_type, projectTypeChanged);
  await project.save();
}

// Delete a project
async function deleteproject(project_id) {
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
  deleteproject,
}