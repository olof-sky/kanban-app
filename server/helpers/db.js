const mysql = require('mysql2/promise');
const config = require('.././config');
const { Sequelize } = require('sequelize');

async function initialize() {
  // create db if it doesn't already exist
  
  const { host, user, password, database } = config.db;
  const connection = await mysql.createConnection(config.db);
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

  // init models and add them to the exported db object
  db.User = require('../api/v1/user/user.model')(sequelize);
  db.Project = require('../api/v1/project/project.model')(sequelize);
  db.User.belongsToMany(db.Project, {
    through: "user_project",
    as: "project",
    foreignKey: "user_id"
  })
  db.Project.belongsToMany(db.User, {
    through: "user_project",
    as: "user",
    foreignKey: "project_id"
  })
  // sync all models with database
  await sequelize.sync({ alter: true });
}

module.exports = db = {};
initialize();

// async function query(sql, params) {
//   const connection = await mysql.createConnection(config.db);
//   const [results, ] = await connection.execute(sql, params);

//   return results;
// }


// module.exports = {
//   query
// }