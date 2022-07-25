import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import '../App.css'

function MainPage() {

const [userList,setUserList] = useState([]);

  useEffect(()=>{
     Axios.get("http://localhost:3002/api/v1/user/getMultiple").then((res)=>{
      setUserList(res.data)
    });
  },[])

  if (!userList) return null;

  return (
    userList.map(function(item, i){
      return <h1 key={i}>{item.first_name}</h1>
      }
    )
  );
}

export default MainPage