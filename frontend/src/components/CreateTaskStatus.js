import React,{useState} from 'react';
import axios from 'axios'
import { refreshToken } from '../helpers/helper'
import { BsPlusCircle } from 'react-icons/bs';
import '../styles/components/CreateTaskStatus.scss'

function CreateTaskStatus(props) {
  const [isActive,setIsActive] = useState(false);
  const [taskStatusDescription,setTaskStatusDescription] = useState("");
  const [taskAdminId,setTaskAdmin] = useState(JSON.parse(sessionStorage.getItem('User'))['user_id']);

  function toggleCreateNew() {
    isActive ? setIsActive(false)
    : setIsActive(true)
  }

  const submitTaskStatus = () => {
    try {
      axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/project/updateProjectTaskStatus/${props.project_id}`,{
        new_task_status: taskStatusDescription,
      }, { headers: { Authorization:sessionStorage.getItem('Token') }}
      )
      setIsActive(false)
      window.location = `/projects/${props.project_id}`
    }
    catch(err) {console.log(err)}
  }
  
  if (isActive) return (
    <div className="create-task-status-body">
      <div className="create-task-status-card">
        <div className="create-task-status-form">
          <h3>Create new task status</h3>
          <input autoFocus placeholder="Task status" type="text" onChange={(e)=> {
            setTaskStatusDescription(e.target.value)
          }}/>
          <button className="btn" onClick={submitTaskStatus}>Create</button>
        </div>
      </div>
    </div>
  )
  else return (
    <div onClick={toggleCreateNew} className="create-task-status-button-body">
      <button onClick={toggleCreateNew} className="create-task-status-button"><BsPlusCircle id="create-task-status-icon"/></button>
    </div>
  )
}

export default CreateTaskStatus