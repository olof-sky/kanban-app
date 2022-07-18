import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../App.css'

function MainPage() {

const [projectList,setProjectList]=useState([]);

let history = useNavigate();

useEffect(()=>{
  Axios.get("http://localhost:3002/api/project/get").then((data)=>{
    setProjectList(data.data)
  });
},[])

return (
    <div className="MainPage">
      <div className="ProjectContainer">
        {projectList.map((val,key)=>{
          return (
            <div className="Project" >
             <h1 className="project-name" onClick={()=>(history.push(`/project/${val.id}`))}>{val.projectName}</h1>
              <h4>{val.project_name}</h4>
            </div>
          )  
        })}  
      </div>
    </div>
    )}

export default MainPage