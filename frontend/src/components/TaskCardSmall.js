import '../styles/components/TaskCardSmall.scss'

const toggleShowProject = () => {
  console.log("click")
}

function TaskCardSmall(props) {
  let adminName = ""
  let assigneeName = ""
  try { adminName = props.task_admin_name.replace(' ', '+') } catch(err) {console.log(err)}
  try { if (props.task_assignee) assigneeName = props.task_assignee.replace(' ', '+') } catch(err) {console.log(err)}
  const adminIcon = `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${adminName}`
  const assigneeIcon = `https://ui-avatars.com/api/?background=ffe253&color=000&name=${assigneeName}`

  return (
    <div onClick={ () => toggleShowProject() } className="project-task-body">
      <div className="project-task-card-small">
        <p>{ props.task_description }</p>
        { props.task_assignee ? (<img className="profile-icon" id="icon" src={assigneeIcon} alt="SVG as an image"></img>) : (<img className="profile-icon" src={adminIcon} alt="SVG as an image"></img>) }
      </div>
    </div>
  )}

export default TaskCardSmall