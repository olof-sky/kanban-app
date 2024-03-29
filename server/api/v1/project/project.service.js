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
  try {  
    const projectId = uuid.v4() 
    const project = new db.Project({
      project_id: projectId, 
      project_name: params.project_name, 
      project_type: params.project_type, 
      project_task_status: JSON.stringify({"Todo": [], "In Progress": [], "Finished": []}), 
      project_admins: params.project_admins
    });
    // save project
    const userProject = new db.User_Projects({
      user_id: userId,
      project_id: projectId, 
    });
    await project.save();
    await userProject.save();
    return project;
  }
  catch(err) {console.log(err)}
}

// Get multiple projects
async function getMultiple(){
  return await db.Project.findAll();
}

// Get multiple by user
async function getMultipleByUser(user_id){
  let userProjects = await getUserProjects(user_id)
  let projects = [];
  
  for (let i = 0; i < userProjects.length; i++) {
    let id = userProjects[i].dataValues.project_id
    
    try {
      await getProject(id).then((response =>
      projects.push(response)
    ))}
    catch (err) {console.log(err)}
  }
  return projects;
}

// Get one project
async function getById(project_id, user_id, res){
  let project = await getUserProjectById(project_id, user_id)
  if (!project) return res.status(400).json("Can not access project.");
  return getProject(project.project_id);
}

async function updateProjectName(project_id, params) {
  const project = await getProject(project_id);
  const projectNameChanged = params.project_name;

  // copy params to project and save
  project.update({ project_name: projectNameChanged });
  await project.save();
}

async function updateProjectType(project_id, params) {
  const project = await getProject(project_id);
  const projectTypeChanged = params.project_type;

  // copy params to project and save
  project.update({ project_type: projectTypeChanged });
  await project.save();
}

async function updateProjectTaskStatus(project_id, params) {
  // trim
  const specialChars = /[\[\]{}\\<>\/]/;
  if (params.new_task_status) {
    params.new_task_status = params.new_task_status.trim()
    params.new_task_status = params.new_task_status.charAt(0).toUpperCase() + params.new_task_status.trim().slice(1)
  }

  if (params.new_task_status.match(specialChars)) {
    return res.status(400).json({"taskStatusError": 'Status uses invalid characters'});
  }

  if (params.new_task_status.length > 36) {
    return res.status(400).json({"taskStatusError": 'Status cannot be longer then 36 characters'});
  }

  // add status
  const project = await getProject(project_id);
  const projectTaskStatus = params.new_task_status;
  taskStatuses = JSON.parse(project.project_task_status);
  taskStatuses[`${projectTaskStatus}`] = [];
  
  // copy params to project and save
  project.update({ project_task_status: JSON.stringify(taskStatuses) });
  await project.save();
}

// Delete a project
async function deleteProject(project_id) {
  const project = await getProject(project_id);
  await project.destroy();
}


//Internal functions
async function getProject(project_id) {
  const project = await db.Project.findByPk(project_id);
  if (!project) throw 'Project not found';
  return project;
}


async function getUserProjectById(project_id, user_id) {
  let project;
  await db.User_Projects.findOne({
    where: {
      user_id: user_id,
      project_id: project_id,
    }
  }).then((response => [
    project = response,
  ]))
  return project;
} 

async function getUserProjects(user_id) {
  let projects = []
  await db.User_Projects.findAll({
    where: {
      user_id: user_id,
    }
  }).then((response => [
    projects = response
  ]))
  return projects;
} 


module.exports = {
  create,
  getMultiple,
  getMultipleByUser,
  getById,
  updateProjectName,
  updateProjectType,
  updateProjectTaskStatus,
  deleteProject,
}