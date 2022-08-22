import React,{useEffect, useState} from 'react'
import Draggable from 'react-draggable';
import {useParams} from 'react-router-dom';
import axios from 'axios'
import CreateTask from '../components/CreateTask'
import CreateTaskStatus from '../components/CreateTaskStatus'
import TaskCardSmall from '../components/TaskCardSmall'
import TaskCard from '../components/TaskCard'
import { BsSearch } from 'react-icons/bs';
import '../styles/views/Project.scss'
import { refreshToken } from '../helper'

function Project() {
const [project,setProject] = useState([]);
const [tasks,setTasks] = useState([]);
const [task,setTask] = useState([]);
const [projectTaskStatus,setProjectTaskStatus] = useState({});
const [currentStatusX,setProjectTaskStatusX] = useState(0);
const [searchValue,setSearchValue] = useState("");
const [showTaskCard,setShowTaskCard] = useState(false);
const [currentTaskId,setCurrentTaskId] = useState("");
const params = useParams();
const nodeRef = React.useRef(null);

const handleClick = (e) => {
  if (e.target.classList.contains("dismiss")) {
    setShowTaskCard(false);
  }
}

function handleStart (event, data) {
  setProjectTaskStatusX(data.x)
};

function handleStop (event, data) {
  let statusArray = [];
  Object.keys(projectTaskStatus).map((key) => (statusArray.push(key)))
  
  if (data.x > currentStatusX) {
    statusArray[event.path[0].id.split("-status-id")[0] || event.path[1].id.split("-status-id")[0]]
  }

  console.log(
    statusArray,
    data,
    data.x, 
    event.path[0].id.split("-status-id")[0] || event.path[1].id.split("-status-id")[0],
    projectTaskStatus)
};

const toggleShowTaskCard = (id) => {
  try {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/projectTask/getById/${params.id}`, { headers: { Authorization:sessionStorage.getItem('Token'), task_id: id }})
    .then((res)=>{
      setTask(res.data)
    });
  }
  catch(err) {
    console.log(err)
  }
  setCurrentTaskId(id)
  if (showTaskCard) {
    setShowTaskCard(false)
  }
  else {
    setShowTaskCard(true) 
  }
}

const changeTaskStatus = (new_task_status) => {
  try {
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/projectTask/updateTaskStatusByProject/${params.id}`, { headers: { Authorization:sessionStorage.getItem('Token'), task_status:new_task_status, task_id: currentTaskId }})
    .then((res)=>{
      setTask(res.data)
      window.location = `/projects/${params.id}`
    })
  }
  catch(err) {
    console.log(err)
  }
}

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
      { showTaskCard ? ( 
      <div className="show-task-card-overlay dismiss" onClick={handleClick}><TaskCard parentCallback={changeTaskStatus} toggleShowTaskCard={toggleShowTaskCard} task={task} project={project}/></div> 
        ) : (null) 
      }
      <div className="project-tasks-header">
        <h1>{project.project_name}</h1>
        <div className="task-search-container"><input autoFocus placeholder="Search task..." value={searchValue} className="task-search" onChange={(e)=> {setSearchValue(e.target.value)}}/><BsSearch id="search-icon"/></div>
      </div>
      <div className="project-tasks">
        {Object.keys(projectTaskStatus).map((key, i) => (
          <Draggable
            onStop={handleStop}
            onStart={handleStart}
            key={i + "-draggable"}
            nodeRef={nodeRef} 
            axis="x"
          >
            <div ref={nodeRef} className="project-task-status" id={i + "-status-id"} key={i + "-status"}>
            <h2>{key}</h2>
            {Object.keys(tasks).map((taskKey, i2) => (
              ((tasks[taskKey].task_status === key && !searchValue) || ((tasks[taskKey].task_status === key && tasks[taskKey].task_description.toLowerCase().includes(searchValue.toLowerCase())))) ? 
              <div key={i2 + "-container"} onClick={ () => toggleShowTaskCard(tasks[taskKey].task_id) }>
              <TaskCardSmall
                key={i2} 
                task_description={tasks[taskKey].task_description}
                task_assignee={tasks[taskKey].task_assignee}
                task_admin_name={tasks[taskKey].task_admin.admin[0]['user_name']}
              /></div> 
              : null
            ))}
            <CreateTask project_id={project.project_id} project_task_status={key}/>
          </div>
          </Draggable>
        ))}
        <div className="project-create-task-status">
          <CreateTaskStatus project_id={project.project_id}/>
        </div>
      </div>
    </div>
  )
}


export default Project