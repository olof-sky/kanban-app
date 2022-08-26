import React,{useState} from 'react';
import axios from 'axios'
import { refreshToken } from '../helpers/helper'
import { BsPlusCircleFill } from 'react-icons/bs';
import '../styles/components/CreateTask.scss'

function CreateTask(props) {
  const [isActive,setIsActive] = useState(false);
  const [taskDescription,setTaskDescription] = useState("");
  const [taskAdminId,setTaskAdmin] = useState(JSON.parse(sessionStorage.getItem('User'))['user_id']);

  function toggleCreateNew() {
    isActive ? setIsActive(false)
    : setIsActive(true)
  }

  const submitTask = () => {
    try {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/getById/${taskAdminId}`).then((res)=>{
        const admin = {
          "admin":[
            //SET "admin" by user_id
            {"user_id": `${taskAdminId}`, 
             "user_name": `${res.data.first_name} ${res.data.last_name}`}]
        }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/projectTask/create`,{
          project_project_id: props.project_id,
          task_description: taskDescription,
          task_status: props.project_task_status,
          task_admin: admin}, { headers: { Authorization:sessionStorage.getItem('Token') }}
        )
        setIsActive(false)
        window.location = `/projects/${props.project_id}`
      });
    }
    catch(err) {console.log(err)}
  }
  
  if (isActive) return (
    <div className="create-task-body">
      <div className="create-task-card">
        <div className="create-task-form">
          <h3>Create a task</h3>
          <input autoFocus placeholder="Task description" type="text" onChange={(e)=> {
            setTaskDescription(e.target.value)
          }}/>
          <button className="btn" onClick={submitTask}>Create</button>
        </div>
      </div>
    </div>
  )
  else return (
    <div className="create-task-body">
      <button onClick={toggleCreateNew} className="create-task-button"><BsPlusCircleFill id="create-task-icon"/></button>
    </div>
  )
}

export default CreateTask