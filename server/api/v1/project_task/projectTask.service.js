const db = require('../../../helpers/db');
const uuid = require("uuid");

// Route for creating a task
async function create(params, res) {

  // trim
  const specialChars = /[\[\]{}\\<>\/]/;

  params.task_description = params.task_description.trim()
  params.task_status = params.task_status.trim()
  
  //validate
  if (params.task_description === "") { return res.status(400).json({"TaskDescriptionError": "Task description can not be empty"})}
  if (params.task_status === "") { return res.status(400).json({"TaskStatusError": "Task status can not be empty"})}
  if (!params.task_admin) { return res.status(400).json({"TaskAdminError": "Task admin can not be empty"})}

  if (params.task_description.match(specialChars)) {
    return res.status(400).json({"TaskDescriptionError": 'Task description uses invalid characters'});
  }

  if (params.task_status.match(specialChars)) {
    return res.status(400).json({"TaskStatusError": 'Task status uses invalid characters'});
  }

  if (params.task_description.length < 1 || params.task_description.length > 280) {
    return res.status(400).json({"TaskDescriptionError": 'Name must be 1-280 chars'});
  }

  // Create
  try {  
    const taskId = uuid.v4() 
    const task = new db.Project_Task({
      task_id: taskId, 
      project_project_id: params.project_project_id, 
      task_description: params.task_description, 
      task_assignee: params.task_assignee, 
      task_admin: params.task_admin,
      task_status: params.task_status,
    });
    // save task
    await task.save();
  }
  catch(err) {console.log(err)}
}

// Get multiple tasks
async function getMultipleByProject(project_id){
  return await db.Project_Task.findAll({
    where: { project_project_id: project_id }
  });
}

// Get one task
async function getById(task_id, res){
  return getTask(task_id);
}

// Delete a task
async function deleteTask(task_id) {
  const task = await getTask(task_id);
  await task.destroy();
}

// Update task status
async function updateTaskStatusByProject(task_id, task_status) {
  if (!task_status) throw 'Task status empty';

  const task = await getTask(task_id);
  const taskStatusChanged = task_status;

  // copy params to project and save
  task.update({ task_status: taskStatusChanged });
  await task.save();
}

//Internal functions
async function getTask(task_id) {
  const task = await db.Project_Task.findByPk(task_id);
  if (!task) throw 'Task not found';
  return task;
}

module.exports = {
  create,
  getMultipleByProject,
  getById,
  updateTaskStatusByProject,
  deleteTask,
}