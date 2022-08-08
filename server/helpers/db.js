const mysql = require('mysql2/promise');
const config = require('.././config');
const { Sequelize } = require('sequelize');

async function initialize() {
  // create db if it doesn't already exist
  
  const dialect = "mysql";
  const { host, user, password, database, port, } = config.db;
  const connection = await mysql.createConnection(config.db);
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  const sequelize = new Sequelize(database, user, password, { host, dialect, port, });

  // init models and add them to the exported db object
  db.User = require('../api/v1/user/user.model')(sequelize);
  db.Project = require('../api/v1/project/project.model')(sequelize);
  db.User_Projects = require('../api/v1/user_project/userProject.model')(sequelize);
  db.Project_Task = require('../api/v1/project_task/projectTask.model')(sequelize);
  db.User.belongsToMany(db.Project, {
    through: "User_Projects",
    as: "project",
    foreignKey: "user_id"
  })
  db.Project.belongsToMany(db.User, {
    through: "User_Projects",
    as: "user",
    foreignKey: "project_id"
  })
  db.Project_Task.belongsTo(db.Project, {
    as: "project",
    foreignKey: "project_project_id"
  })
  db.Project.hasMany(db.Project_Task, {
    as: "project_task",
    foreignKey: "project_project_id"
  })
  
  // sync all models with database
  await sequelize.sync({ alter: true });
}

module.exports = db = {};
initialize();