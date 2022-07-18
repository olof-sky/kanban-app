const mysql = require('mysql2')
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "kanban"
})

module.exports = db;