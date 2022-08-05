const db = require('../../../helpers/db');
const uuid = require("uuid");

// Route for creating a project

async function create(params, userId) {
  // trim
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  params.project_name = params.project_name.trim().charAt(0).toUpperCase() + params.project_name.trim().slice(1).toLowerCase();
  params.project_type = params.project_type.trim().charAt(0).toUpperCase() + params.project_type.trim().slice(1).toLowerCase();
  //validate
  if (params.project_name === "") { return res.status(400).json({"ProjectNameError": "Project name can not be empty"})}
  if (params.project_type === "") { return res.status(400).json({"ProjectTypeError": "Project type can not be empty"})}
  if (!params.project_type === "Kanban" || !params.project_type === "Future option") { return res.status(400).json({"ProjectTypeError": "Project type is invalid"})}

  if (params.project_name.match(specialChars)) {
    return res.status(400).json({"projectNameError": 'Name uses invalid characters'});
  }

  if (params.project_type.match(specialChars)) {
    return res.status(400).json({"ProjectTypeError": 'Type uses invalid characters'});
  }

  if (params.project_name.length < 1 || params.project_name.length > 30) {
    return res.status(400).json({"ProjectNameError": 'Name must be 1-30 chars'});
  }

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

// Get multiple by user
async function getMultipleByUser(user_id){
  let userProjects = []
  let projects = []
  await db.User_Projects.findAll({
    where: {
      user_id: user_id,
    }
  }).then((response => [
    userProjects = response
  ]))
  
  for (let i = 0; i < userProjects.length; i++) {
    let id = userProjects[i].dataValues.project_id
    await getById(id).then((response =>
      projects.push(response)
    ))
  }
  return projects;
}

// Get one project
async function getById(project_id){
  return await getProject(project_id);
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

async function getProject(project_id) {
  const project = await db.Project.findByPk(project_id);
  if (!project) throw 'Project not found';
  return project;
}

module.exports = {
  create,
  getMultiple,
  getMultipleByUser,
  getById,
  updateProjectName,
  updateProjectType,
  deleteProject,
}