import React,{useState,useEffect,} from 'react'
import axios from 'axios'
import CreateProject from '../components/CreateProject'
import { BsSearch } from 'react-icons/bs';
import '../styles/views/Projects.scss'

function Projects() {
const [projectList,setProjectList] = useState([]);
const [searchValue,setSearchValue] = useState("");
const [showCreate,toggleShowCreate] = useState(false);

const handleClick = (e) => {
  if (e.target.classList.contains("dismiss")) {
    toggleShowCreate(false);
    document.body.style.overflow = ""
  }
}

try {
  const user = JSON.parse(sessionStorage.getItem('User'));
  useEffect( ()=>{
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/project/getMultipleByUser/${user['user_id']}`, { headers: { Authorization:sessionStorage.getItem('Token') }})
    .then((res)=>{
      return setProjectList(res.data)
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
  window.location = `/profile/${id}`
}

const toggleShowCreateWindow = () => {
  if (showCreate) {
    toggleShowCreate(false)
    document.body.style.overflow = ""
  }
  else {
    toggleShowCreate(true) 
    document.body.style.overflow = "hidden"
  }
}

if (projectList.length === 0) { 
  return (
    <div className="projects-body">
      <CreateProject/>
    </div>
  )
}

if (projectList) {
  return (
    <div className="projects-body">
      { showCreate ? ( 
      <div className="create-project-overlay dismiss" onClick={handleClick}><CreateProject toggleShowCreateWindow={toggleShowCreateWindow}/></div> 
        ) : (null) 
      }
      <div className="projects-header">
        <div className="project-search-container"><input autoFocus placeholder="Search project..." value={searchValue} className="project-search" onChange={(e)=> {setSearchValue(e.target.value)}}/><BsSearch id="search-icon"/></div>
        <button onClick={ toggleShowCreateWindow } className="btn">Create project</button>
      </div>
      <tbody className="projects-table">
        <tr className="projects-table-header">
          <th>Project</th>
          <th>Type</th>
          <th>Id</th>
          <th>Owner</th>
        </tr>
        {!searchValue ? projectList.map((item, i) => (
          <tr key={i}>
            <td className="projects-table-name" onClick={() => { goToProject(item.project_id) }}>{item.project_name}</td>
            <td className="projects-table-type">{item.project_type}</td>
            <td className="projects-table-id">{item.project_id}</td>
            <td className="projects-table-admin" onClick={() => { goToUser(item.project_admins.admins[0].user_id) }}>{item.project_admins.admins[0].user_name}</td>
          </tr>
        )) : (
          projectList.map((item, i) => (
            (item.project_name.toLowerCase().includes(searchValue.toLowerCase()) || item.project_admins.admins[0].user_name.toLowerCase().includes(searchValue.toLowerCase())) ? (            
            <tr key={i}>
              <td className="projects-table-name" onClick={() => { goToProject(item.project_id) }}>{item.project_name}</td>
              <td className="projects-table-type">{item.project_type}</td>
              <td className="projects-table-id">{item.project_id}</td>
              <td className="projects-table-admin" onClick={() => { goToUser(item.project_admins.admins[0].user_id) }}>{item.project_admins.admins[0].user_name}</td>
            </tr>
            ) : ( null )
        )))}
      </tbody>
    </div>
  )
}
}

export default Projects