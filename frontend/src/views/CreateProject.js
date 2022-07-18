import React,{useState} from 'react';
import Axios from 'axios'
import '../App.css'

function CreatePost() {

const [projectName,setProjectName] = useState("");
const [type,setType] = useState("");

const submitProject = () => {
Axios.post('http://localhost:3002/api/project/create', {projectName: projectName, type: type})
}
  return (
    <div className="CreateProject">
      <div className="uploadProject">
        <label>Project name: </label>
        <input type="text" onChange={(e)=> {
          setProjectName(e.target.value)
        }}/>
        <label>Type: </label>
        <input type="text" onChange={(e)=>{
          setType(e.target.value)}}/>
        <button onClick={submitProject}>Submit Project</button>
      </div>
    </div>
  )}

export default CreatePost