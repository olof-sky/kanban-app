const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: "localhost",
      user: "root",
      password: "password",
      database: "kanban"
    },
    listPerPage: 10,
    userRolesList: {
      "Admin": 7777,
      "User": 1000,
    }
  };
  module.exports = config;