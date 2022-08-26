import React,{useEffect} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios'
import { refreshToken } from '../helpers/helper'
import '../styles/views/Profile.scss'

function Profile() {
const params = useParams();
const id = params.id || JSON.parse(sessionStorage.getItem('User')).user_id;
  try {
    useEffect( ()=>{
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/getById/${id}`, { headers: { Authorization:sessionStorage.getItem('Token') }})
      .then((res)=>{
        console.log(res.data)
      });
    },[])
  }
  catch(err) {
    console.log(err)
  }
  
  
    return (
      <div className="profile-body">
        {params.id}
      </div>
    )
  }


export default Profile