import React,{useState} from 'react';
import axios from 'axios'
import '../App.css'

function CreatePost() {

const [projectName,setProjectName] = useState("");
const [projectType,setProjectType] = useState("");

const submitProject = () => {
axios.post('http://localhost:3002/api/v1/project/create', {projectName: projectName, projectType: projectType})
}
  return (
    <div className="CreateProject">
      <div className="uploadProject">
        <label>Project name: </label>
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

export default CreatePost