import React,{useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios'
import CreateTask from '../components/CreateTask'
import TaskCardSmall from '../components/TaskCardSmall'
import { BsSearch } from 'react-icons/bs';
import '../styles/views/Project.scss'
import { refreshToken } from '../helper'

function Project() {
const [project,setProject] = useState([]);
const [tasks,setTasks] = useState([]);
const [projectTaskStatus,setProjectTaskStatus] = useState({});
const [searchValue,setSearchValue] = useState("");
const params = useParams();

try {
  useEffect( ()=>{
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/project/getById/${params.id}`, { headers: { Authorization:sessionStorage.getItem('Token') }})
    .then((res)=>{
      setProjectTaskStatus(JSON.parse(res.data.project_task_status))
      return setProject(res.data)
    });
  },[])
}
catch(err) {
  console.log(err)
}

try {
  useEffect( ()=>{
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/projectTask/getMultipleByProject/${params.id}`, { headers: { Authorization:sessionStorage.getItem('Token') }})
    .then((res)=>{
      return setTasks(res.data)
    });
  },[])
}
catch(err) {
  console.log(err)
}

if (project) return (
    <div className="project-body">
      <div className="project-tasks-header">
        <h1>{project.project_name}</h1>
        <div className="task-search-container"><input autoFocus placeholder="Search task..." value={searchValue} className="task-search" onChange={(e)=> {setSearchValue(e.target.value)}}/><BsSearch id="search-icon"/></div>
      </div>
      <div className="project-tasks">
        {Object.keys(projectTaskStatus).map((key, i) => (
          <div className="project-task-status" key={i}>
            <h2>{key}</h2>
            {Object.keys(tasks).map((taskKey, i2) => (
              (tasks[taskKey].task_status === key) ? 
              <TaskCardSmall 
                key={i2} 
                task_description={tasks[taskKey].task_description}
                task_asignee={tasks[taskKey].task_asignee}
              /> 
              : null
            ))}
            <CreateTask project_id={project.project_id} project_task_status={key}/>
          </div>
        ))}
      </div>
    </div>
  )
}


export default Project