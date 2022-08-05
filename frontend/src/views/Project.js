import React,{useEffect} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios'
import '../styles/views/Projects.scss'
import { refreshToken } from '../helper'

function Project() {
const params = useParams();

try {
  useEffect( ()=>{
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/project/getById/${params.id}`, { headers: { Authorization:sessionStorage.getItem('Token') }})
    .then((res)=>{
      return console.log(res)
    });
  },[])
}
catch(err) {
  console.log(err)
}


  return (
    <div className="project-body">
      {params.id}
    </div>
  )
}


export default Project