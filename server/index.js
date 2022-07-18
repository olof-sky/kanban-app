const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const  PORT = 3002;
app.use(cors());
app.use(express.json())

// Route to get all projects
app.get("/api/project/get", (req,res)=>{
db.query("SELECT * FROM project", (err,result)=>{
    if(err) {
    console.log(err)
    } 
res.send(result)
});   });

// Route to get one project
app.get("/api/project/getFromId/:id", (req,res)=>{

const id = req.params.id;
 db.query("SELECT * FROM project WHERE id = ?", id, 
 (err,result)=>{
    if(err) {
    console.log(err)
    } 
    res.send(result)
    });   });

// Route for creating the project
app.post('/api/project/create', (req,res)=> {

const projectName = req.body.projectName;
const type = req.body.type;

db.query("INSERT INTO project (project_name, type) VALUES (?,?)",[projectName,type], (err,result)=>{
   if(err) {
   console.log(err)
   } 
   console.log(result)
});   })

// Route to delete a project

app.delete('/api/project/delete/:id',(req,res)=>{
const id = req.params.id;

db.query("DELETE FROM project WHERE id= ?", id, (err,result)=>{
if(err) {
console.log(err)
        } }) })

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})