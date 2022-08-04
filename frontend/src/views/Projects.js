import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import CreateProject from '../components/CreateProject'
import '../styles/views/Projects.scss'

function Projects() {
const [projectList,setProjectList] = useState([]);

try {
  const user = JSON.parse(sessionStorage.getItem('User'));
  useEffect( ()=>{
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/project/getMultipleByUser/${user['user_id']}`, { headers: { Authorization:sessionStorage.getItem('Token') }})
    .then((res)=>{
      setProjectList(res.data)
    });
  },[])
}
catch(err) {
  console.log(err)
}


const goToProject = (id) => {
  console.log(id)
  window.location = `/projects/${id}`
}

const goToUser = (id) => {
  console.log(id)
  window.location = `/users/${id}`
}

if (projectList.length === 0) { 
  return (
    <div className="projects-body">
      <CreateProject></CreateProject>
    </div>
  )
}

else {
  return (
    <div className="projects-body">
      <CreateProject></CreateProject>
      <h2>Projects</h2>
      <tbody className="projects-table">
        <tr className="projects-table-header">
          <th>Project</th>
          <th>Type</th>
          <th>Id</th>
          <th>Admin</th>
        </tr>
        {projectList.map((item, i) => (
          <tr key={i}>
            <td className="projects-table-name" onClick={() => { goToProject(item.project_id) }}>{item.project_name}</td>
            <td className="projects-table-type">{item.project_type}</td>
            <td className="projects-table-id">{item.project_id}</td>
            <td className="projects-table-admin" onClick={() => { goToUser(item.project_admins.admins[0].user_id) }}>{item.project_admins.admins[0].user_name}</td>
          </tr>
        ))}
      </tbody>
    </div>
  )
}
}

export default Projects