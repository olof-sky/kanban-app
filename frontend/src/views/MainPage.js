import React,{useState,useEffect} from 'react'
import axios from 'axios'
import '../App.css'

function MainPage() {

async function refresh () {
  const resp = await axios.get('http://localhost:3002/api/auth/refreshToken', { headers: { Authorization:sessionStorage.getItem('Refresh-Token') }})
  console.log(resp)
  if (resp) {
    let token = resp.headers.authorization;
    let refreshToken = resp.headers['refresh-token'];
    sessionStorage.setItem('Token', token);
    sessionStorage.setItem('Refresh-Token', refreshToken);
    axios.defaults.headers.common['Authorization'] = token;
    axios.defaults.headers.common['Refresh-Token'] = refreshToken;
  }
}

const [userList,setUserList] = useState([]);
try {
  useEffect( ()=>{
    axios.get("http://localhost:3002/api/v1/user/getMultiple", { headers: { Authorization:sessionStorage.getItem('Token') }})
    .then((res)=>{
      setUserList(res.data)
    });
  },[])
  console.log(userList[0])
}
catch(err) {
  console.log(err)
}

  if (!userList) return null;

  return (
    <div>
      <button onClick={refresh}>Refresh</button>
    </div>
  )
}

export default MainPage