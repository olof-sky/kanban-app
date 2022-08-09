import React,{useState} from 'react';
import '../styles/components/TaskCardSmall.scss'

function TaskCardSmall(props) {
  return (
    <div className="project-task-body">
      <div className="project-task-card-small">
        <p>{props.task_description}</p>
        { props.task_asignee ? (<p>Assigned to: {props.task_asignee}</p>) : ( null ) }
      </div>
    </div>
  )}

export default TaskCardSmall