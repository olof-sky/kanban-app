const db = require('../helpers/db');

module.exports = async function(req, res, next) {
  // Get user projects
  let userProjects = await getUserProjects(res.user.user_id)
  let project = [];
  
  // Validation
  for (let i = 0; i < userProjects.length; i++) {
    let id = userProjects[i].dataValues.project_id
    
    try {
      await getProject(id).then((response =>
      response.project_id === req.params.id ? project.push(response) : null
    ))}
    catch (err) {console.log(err)}
  }
  if(!project) return res.status(400).json({"Error" : "Can not access given project"})
  next();
};

async function getProject(project_id) {
    const project = await db.Project.findByPk(project_id);
    if (!project) throw 'Project not found';
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