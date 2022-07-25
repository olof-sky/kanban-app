import React,{useState} from 'react';
import Axios from 'axios'
import '../App.css'


function Login() {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const submit = async () => {
  try {
    const resp = await Axios.post('http://localhost:3002/api/auth/login', {email: email, password: password})
    try { 
      await Axios.get(resp.data.redirect, { headers: { 'Authorization' : resp.headers.authorization } })
      .then(window.location = 'http://localhost:3000/mainpage') }
    catch (err) {
      console.log(err);
    }
  }
  catch (e) {
    console.log(e);
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