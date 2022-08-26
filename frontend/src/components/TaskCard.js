import React from 'react';
import { refreshToken } from '../helpers/helper'
import Select, { components } from "react-select";
import { IoMdCloseCircle } from 'react-icons/io';
import '../styles/components/TaskCard.scss'

function TaskCard(props) {
  const {parentCallback, toggleShowTaskCard, task, project} = props;
  const projectTaskStatuses = Object.keys(JSON.parse(project.project_task_status)).map((key, i) => ({"value": key, "label": key}));
  let selectedTaskStatus = {"value":task.task_status, "label": task.task_status};

  const changeStatus = (e) => {
    parentCallback(e)
  }

return (
  <div className="task-card-body">
    <div className="task-card-card">
      <IoMdCloseCircle className="close-icon" onClick={toggleShowTaskCard}></IoMdCloseCircle>
      <div className="task-card-content">
        <div className="task-card-activity">
          <h3>{task.task_description}</h3>
        </div>
        <div className="task-card-information">
          <div className="task-card-select-container">
            <Select options={projectTaskStatuses} value={selectedTaskStatus} className="task-card-select-status" id="task-card-select" type="text" onChange={(e)=>{
              changeStatus(e.value)}}>
            </Select>
          </div>
          <div className="task-card-select-container">
            <Select value={task.task_assignee ? {"value": task.task_assignee, "label": task.task_assignee} : {"value": "Not assigned", "label": "Not assigned"}} className="task-card-select-status" type="text" id="task-card-select" onChange={(e)=>{
              setTaskStatus(e.target.value)}}>
            </Select>
          </div>
          <div className="task-card-select-container">
            <Select value={task.task_admin ? {"value": task.task_admin.admin[0]['user_name'], "label": task.task_admin.admin[0]['user_name']} : null} className="task-card-select-status" type="text" id="task-card-select" onChange={(e)=>{
              setTaskStatus(e.target.value)}}>
            </Select>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

export default TaskCard