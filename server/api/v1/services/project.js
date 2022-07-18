const db = require('./db');
const helper = require('../../../helper');
const config = require('../../../config');

// Route to get multiple projects
async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(`SELECT * FROM project LIMIT ${offset},${config.listPerPage}`);
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}
    
// Route to get one project
async function getById(projectId){
  const rows = await  db.query(`SELECT * FROM project WHERE project_id = ${projectId}`);
  const data = helper.emptyOrRows(rows);
  const meta = {projectId};
  
  return {
    data,
    meta
  }
}


// Route for creating a project
async function create(newProject){
  const rows = await db.query(`INSERT INTO project (project_id, project_name, type) VALUES (3, ${newProject.projectName}, ${newProject.type})`);
  const data = helper.emptyOrRows(rows);
  const meta = {
    project_name: newProject.project_name, 
    type: newProject.type};
  
  return {
    data,
    meta
  }
}
    




// router.post('/api/v1/project/create', (req,res)=> {
    
//     const projectName = req.body.projectName;
//     const type = req.body.type;
    
//     db.query("INSERT INTO project (project_name, type) VALUES (?,?)",[projectName,type], (err,result)=>{
//        if(err) {
//        console.log(err)
//        } 
//        console.log(result)
//     });   })
    
    // Route to delete a project
    
// router.delete('/api/v1/project/delete/:id',(req,res)=>{
//     const id = req.params.id;
    
//     db.query("DELETE FROM project WHERE id= ?", id, (err,result)=>{
//     if(err) {
//     console.log(err)
//             } }) })

module.exports = {
  getMultiple,
  getById,
  create,
}