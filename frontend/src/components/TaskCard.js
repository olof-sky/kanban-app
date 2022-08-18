import React from 'react';
import { refreshToken } from '../helper'
import { IoMdCloseCircle } from 'react-icons/io';
import '../styles/components/TaskCard.scss'

function TaskCard(props) {
  const {toggleShowTaskCard, task} = props;

return (
  <div className="task-card-body">
    <div className="task-card-card">
      <IoMdCloseCircle className="close-icon" onClick={toggleShowTaskCard}></IoMdCloseCircle>
      <div className="task-card-content">
        <div className="task-card-activity">
          <h1>{task.task_description}</h1>
        </div>
        <div className="task-card-information">
          <select className="task-card-select-status" type="text" onChange={(e)=>{
            setProjectType(e.target.value)}}>
            <option value="Get statuses here">Status here</option>
            <option disabled value="">...</option>
          </select>
          <select className="task-card-select-status" type="text" onChange={(e)=>{
            setProjectType(e.target.value)}}>
            <option value="Assignee">{task.task_assignee ? <p>Assigned to:{task.task_assignee}</p> : <p>Assignee: Not assigned</p> }</option>
            <option disabled value="">...</option>
          </select>
          <select className="task-card-select-status" type="text" onChange={(e)=>{
            setProjectType(e.target.value)}}>
             <option value="Admin">{task.task_admin ? <p>Admin: {task.task_admin.admin[0]['user_name']}</p> : null}</option>
            <option disabled value="">...</option>
          </select>
        </div>
      </div>
    </div>
  </div>
)}

export default TaskCard