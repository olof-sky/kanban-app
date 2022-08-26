import React,{useState} from 'react';
import axios from 'axios'
import { refreshToken } from '../helpers/helper'
import { IoMdCloseCircle } from 'react-icons/io';
import '../styles/components/CreateProject.scss'

function CreateProject(props) {
  const [projectName,setProjectName] = useState("");
  const [projectType,setProjectType] = useState("Kanban");
  const [projectAdmin,setProjectAdmin] = useState(JSON.parse(sessionStorage.getItem('User'))['user_id']);
  const {toggleShowCreateWindow} = props;

  const submitProject = () => {
    try {
      console.log(projectType)
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/getById/${projectAdmin}`).then((res)=>{
        const projectAdmins = {
          "admins":[
            //SET "admin" by user_id
            {"user_id": `${projectAdmin}`, 
             "user_name": `${res.data.first_name} ${res.data.last_name}`}]
        }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/project/create`,{
          project_name: projectName,
          project_type: projectType,
          project_admins: projectAdmins,}, { headers: { Authorization:sessionStorage.getItem('Token') }}
        ).then((response) => {
          window.location = `/projects/${response.data.Project.project_id}`
        });
      });
    }
    catch(err) {console.log(err)}
  }
  
  return (
    <div className="create-project-body">
      <div className="create-project-card">
        <IoMdCloseCircle className="close-icon" onClick={toggleShowCreateWindow}></IoMdCloseCircle>
        <div className="create-project-form">
          <h3>Create a new project</h3>
          <input autoFocus placeholder="Project name" type="text" onChange={(e)=> {
            setProjectName(e.target.value)
          }}/>
          <select type="text" onChange={(e)=>{
            setProjectType(e.target.value)}}>
            <option value="Kanban">Kanban</option>
            <option disabled value="">...</option>
          </select>
          <button className="btn" onClick={submitProject}>Create</button>
        </div>
      </div>
    </div>
  )}

export default CreateProject