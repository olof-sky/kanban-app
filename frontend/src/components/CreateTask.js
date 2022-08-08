import React,{useState} from 'react';
import axios from 'axios'
import { refreshToken } from '../helper'
import '../styles/components/CreateTask.scss'

function CreateTask(props) {
  const [taskDescription,setTaskDescription] = useState("");
  const [taskStatus,setTaskStatus] = useState("");
  const [taskAdminId,setTaskAdmin] = useState(JSON.parse(sessionStorage.getItem('User'))['user_id']);

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
          task_status: taskStatus,
          task_admin: admin}, { headers: { Authorization:sessionStorage.getItem('Token') }}
        )
        refreshToken();
      });
    }
    catch(err) {console.log(err)}
  }
  
  return (
    <div className="create-task-body">
      <div className="create-task-card">
        <div className="create-task-form">
          <h3>Create a task</h3>
          <input autoFocus placeholder="Task description" type="text" onChange={(e)=> {
            setTaskDescription(e.target.value)
          }}/>
          <input autoFocus placeholder="Task status" type="text" onChange={(e)=> {
            setTaskStatus(e.target.value)
          }}/>
          <button className="btn" onClick={submitTask}>Create</button>
        </div>
      </div>
    </div>
  )}

export default CreateTask