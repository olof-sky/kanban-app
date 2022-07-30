import React,{useState} from 'react';
import axios from 'axios'
import LoginSideImg from '../assets/LoginSideImg.png'
import '../styles/LoginPage.scss'
const validator = require("email-validator");

function Login() {

const [firstName,setFirstName] = useState("");
const [lastName,setLastName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [verifyPassword,setVerifyPassword] = useState("");
const [showRegister,showRegisterForm] = useState(false);
const [errorMesssage,setErrorMessage] = useState("");

const submit = async () => {
  try {
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
  catch(err) {
    setErrorMessage(err.response.data.Error)
  }
}

const register = async () => {
  if(!validator.validate(email)) return setErrorMessage(`Email ${email} is not valid`);
  if (verifyPassword !== password) return setErrorMessage("Passwords doesn't match");
  try {
    const resp = await axios.post('http://localhost:3002/api/v1/user/create', 
    { first_name: firstName, last_name: lastName, email: email, password: password } )
    console.log(resp)
    window.location = "/"
  }
  catch(err) {
    setErrorMessage(err.response.data.response)
  }
}

const toggleForm = function () {
  if (!showRegister) {
    showRegisterForm(true)
  }
  else showRegisterForm(false);
  setErrorMessage("");
}

return (
  <div className="login-body">
    <div className="login-left-container">
      { showRegister ? (
        <div className="form-card">
          <div className="inputs">
            <h2>Sign up now</h2>
            <p>{errorMesssage}</p>
            <input required placeholder="First name" type="text" onChange={(e)=> {
              setFirstName(e.target.value)}}/>
            <input required placeholder="Last name" type="text" onChange={(e)=>{
              setLastName(e.target.value)}}/>
            <input required placeholder="Email" type="email" onChange={(e)=> {
              setEmail(e.target.value)}}/>
            <input required placeholder="Password" type="password" onChange={(e)=>{
              setPassword(e.target.value)}}/>
            <input required placeholder="Verify password" type="password" onChange={(e)=>{
              setVerifyPassword(e.target.value)}}/>
          </div>
          <div className="buttons">
            <button onClick={register} id="sign-btn">REGISTER</button>      
            <button onClick={toggleForm}>BACK</button>      
          </div>
        </div> 
      ) : (
        <div className="form-card">
          <h1>Welcome to Skylan</h1>
          <p>{errorMesssage}</p>
          <div className="inputs">
            <input required placeholder="Email" type="email" onChange={(e)=> {
              setEmail(e.target.value)}}/>
            <input required placeholder="Password" type="password" onChange={(e)=>{
              setPassword(e.target.value)}}/>
          </div>
          <div className="buttons">
            <button id="sign-btn" onClick={submit}>SIGN IN</button>
            <button id="register-btn" onClick={toggleForm}>REGISTER</button>
          </div>
        </div>
      )}
    </div>
    <div className="login-right-container">
    <img src={LoginSideImg} alt="sideImg" id="login-image" />
    </div>
  </div>
)}

export default Login