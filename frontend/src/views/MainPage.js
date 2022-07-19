import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import '../App.css'

function MainPage() {

const [projectList,setProjectList] = useState([]);

  useEffect(()=>{
     Axios.get("http://localhost:3002/api/v1/project/getMultiple").then((res)=>{
      setProjectList(res.data.data)
    });
  },[])

  if (!projectList) return null;

  return (
    projectList.map(function(item, i){
      return <h1 key={i}>{item.project_name}</h1>
      }
    )
  );
}

export default MainPage