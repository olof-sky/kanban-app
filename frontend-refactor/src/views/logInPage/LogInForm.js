import React, {useState} from "react"
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import '../../styles/views/LoginPage.scss'

const { logout, getLoggedInUser } = useAuth;
const validator = require("email-validator");

function LogInForm (props) {
  const {parentCallback} = props;
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [isEmailError,setIsEmailError] = useState([false, ""]);
  const [isPasswordError,setIsPasswordError] = useState([false, ""]);

  async function login() {
    resetErrors()
    let isError = false
    if(!validator.validate(email)) ( setIsEmailError([true, `Email is not valid`]), setEmail(""));
    if (!email) ( setIsEmailError([true, "Email is empty"]), isError = true);
    if (!password) ( setIsPasswordError([true, "Password is empty"]), isError = true);
    if(isError) return;

    try {
      const resp = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, 
      { email: email, password: password }
      )
      if (resp) {
        let token = resp.headers.authorization;
        let refreshToken = resp.headers['refresh-token'];
        sessionStorage.setItem('Token', token);
        sessionStorage.setItem('Refresh-Token', refreshToken);
        axios.defaults.headers.common['Authorization'] = token;
        axios.defaults.headers.common['Refresh-Token'] = refreshToken;
        console.log("getLoggedInUser")
        getLoggedInUser;
      }
    }
    catch(err) {
      console.log(err)
      if(err.response.data.EmailError) {
        setIsEmailError([true, err.response.data.EmailError])
        setEmail("");
      }
      if(err.response.data.PasswordError) {
        setIsPasswordError([true, err.response.data.PasswordError]);
        setPassword("");
      }
    }
  }

  const toggleForm = () => {
    resetErrors()
    resetFields()
    parentCallback()
  }

  const resetErrors = function () {
    setIsEmailError([false, ""]);
    setIsPasswordError([false, ""]);
  }
  
  const resetFields = function () {
    setEmail("");
    setPassword("");
  }

  return (
    <div className="form-card">
      <h1>Welcome to Skylan</h1>
      <div className="inputs">
      { isEmailError[0] && email.length < 1 ? ( 
        <input autoFocus className="input-error" required value={email} placeholder={isEmailError[1]} type="email" onChange={(e)=> {
          setEmail(e.target.value)}}/> 
        ) : (
        <input autoFocus required value={email} placeholder="Email" type="email" onChange={(e)=> {
          setEmail(e.target.value)}}/> 
        )
      }
      { isPasswordError[0] && password.length < 1 ? ( 
        <input className="input-error" required value={password} placeholder={isPasswordError[1]} type="password" onChange={(e)=>{
          setPassword(e.target.value)}}/>
        ) : (
        <input required value={password} placeholder="Password" type="password" onChange={(e)=>{
          setPassword(e.target.value)}}/>
        )
      }
      </div>
      <div className="buttons">
        <button id="sign-btn" onClick={login}>SIGN IN</button>
        <button id="register-btn" onClick={toggleForm}>REGISTER</button>
      </div>
    </div>
  )
}

export default LogInForm;