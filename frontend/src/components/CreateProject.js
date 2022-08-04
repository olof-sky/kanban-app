import React,{useState} from 'react';
import axios from 'axios'
import { refreshToken } from '../helper'
import '../styles/components/CreateProject.scss'

function CreateProject() {
  const [projectName,setProjectName] = useState("");
  const [projectType,setProjectType] = useState("");
  const [projectAdmin,setProjectAdmin] = useState(JSON.parse(sessionStorage.getItem('User'))['user_id']);

  const submitProject = () => {
    try {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/getById/${projectAdmin}`).then((res)=>{
        const projectAdmins = {
          "admins":[
            //SET "admin" by user_id
            {"user_id": `${projectAdmin}`, 
             "user_name": `${res.data.first_name} ${res.data.last_name}`}
          ]
        }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/project/create`,
          {
            project_name: projectName,
            project_type: projectType,
            project_admins: projectAdmins,
          },
          { headers: { Authorization:sessionStorage.getItem('Token') } }
        )
        refreshToken();
        window.location = "/projects";
      });
    }
    catch(err) {console.log(err)}
  }
  
  return (
    <div className="create-project-body">
      <div className="create-project-card">
        <label>Project Name: </label>
        <input type="text" onChange={(e)=> {
          setProjectName(e.target.value)
        }}/>
        <label>Project Type: </label>
        <input type="text" onChange={(e)=>{
          setProjectType(e.target.value)}}/>
        <button onClick={submitProject}>Submit Project</button>
      </div>
    </div>
  )}

export default CreateProject