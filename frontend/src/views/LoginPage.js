import React,{useState} from 'react';
import axios from 'axios'
import '../App.css'


function Login() {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const submit = async () => {
  const resp = await axios.post('http://localhost:3002/api/auth/login', 
    { email: email, password: password }
  )
  if (resp) {
    let token = resp.headers.authorization;
    let refreshToken = resp.headers['refresh-token'];
    sessionStorage.setItem('Token', token);
    sessionStorage.setItem('Refresh-Token', refreshToken);
    axios.defaults.headers.common['Authorization'] = token;
    axios.defaults.headers.common['Refresh-Token'] = refreshToken;
    window.location = "/"
  }
}

return (
  <div className="Login">
    <div className="loginLabels">
      <label>Email: </label>
      <input type="email" onChange={(e)=> {
        setEmail(e.target.value)
      }}/>
      <label>Password: </label>
      <input type="password" onChange={(e)=>{
        setPassword(e.target.value)}}/>
      <button onClick={submit}>Login</button>
    </div>
  </div>
)}

export default Login