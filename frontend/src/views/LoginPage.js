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

const [isEmailError,setIsEmailError] = useState([false, ""]);
const [isPasswordError,setIsPasswordError] = useState([false, ""]);
const [isFirstNameError,setIsFirstNameError] = useState([false, ""]);
const [isLastNameError,setIsLastNameError] = useState([false, ""]);

const resetErrors = function () {
  setIsEmailError([false, ""]);
  setIsPasswordError([false, ""]);
  setIsFirstNameError([false, ""]);
  setIsLastNameError([false, ""]);
}

const resetFields = function () {
  setFirstName("");
  setLastName("");
  setEmail("");
  setPassword("");
  setVerifyPassword("");
}

const login = async () => {
  //validate
  resetErrors()
  let isError = false
  if(!validator.validate(email)) ( setIsEmailError([true, `Email is not valid`]), setEmail(""));
  if (!email) ( setIsEmailError([true, "Email is empty"]), isError = true);
  if (!password) ( setIsPasswordError([true, "Password is empty"]), isError = true);
  if(isError) return;

  //submit
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
      window.location = "/"
    }
  }
  catch(err) {
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

const register = async () => {
  //validate
  resetErrors()
  let isError = false
  if(!validator.validate(email)) ( setIsEmailError([true, "Email is not valid"]), setEmail(""), isError = true);
  if (verifyPassword !== password) ( setIsPasswordError([true, "Passwords doesn't match"], setVerifyPassword("")), isError = true);
  if (!email) ( setIsEmailError([true, "Email is empty"]), isError = true);
  if (!verifyPassword || !password) ( setIsPasswordError([true, "Password is empty"]), isError = true);
  if (!firstName) ( setIsFirstNameError([true, "First name is empty"]), isError = true);
  if (!lastName) ( setIsLastNameError([true, "Last name is empty"]), isError = true);
  if(isError) return;

  //submit
  try {
    const resp = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/create`, 
    { first_name: firstName, last_name: lastName, email: email, password: password } )
    console.log(resp)
    window.location = "/"
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
    if(err.response.data.FirstNameError) {
      setIsFirstNameError([true, err.response.data.FirstNameError]);
      setFirstName("");
    }
    if(err.response.data.LastNameError) {
      setIsLastNameError([true, err.response.data.LastNameError]);
      setLastName("");
    }
  }
}

const toggleForm = function () {
  resetErrors()
  resetFields()
  if (!showRegister) {
    showRegisterForm(true)
  }
  else showRegisterForm(false);
}

return (
  <div className="login-body">
    <div className="login-left-container">
      { showRegister ? (
        <div className="form-card">
          <div className="inputs">
            <h2>Sign up now</h2>
            { isFirstNameError[0] && firstName.length < 1 ? ( 
              <input className="input-error" required value={firstName} placeholder={isFirstNameError[1]} type="text" onChange={(e)=> {
                setFirstName(e.target.value)}}/> 
              ) : (
              <input required value={firstName} placeholder="First name" type="text" onChange={(e)=> {
                setFirstName(e.target.value)}}/> 
              )
            }
            { isLastNameError[0] && lastName.length < 1 ? ( 
              <input className="input-error" required value={lastName} placeholder={isLastNameError[1]} type="text" onChange={(e)=> {
                setLastName(e.target.value)}}/> 
              ) : (
              <input required value={lastName} placeholder="Last name" type="text" onChange={(e)=> {
                setLastName(e.target.value)}}/> 
              )
            }
            { isEmailError[0] && email.length < 1 ? ( 
              <input className="input-error" required value={email} placeholder={isEmailError[1]} type="email" onChange={(e)=> {
                setEmail(e.target.value)}}/> 
              ) : (
              <input required value={email} placeholder="Email" type="email" onChange={(e)=> {
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
            { isPasswordError[0] && verifyPassword.length < 1 ? ( 
              <input className="input-error" required value={verifyPassword} placeholder={isPasswordError[1]} type="password" onChange={(e)=>{
                setVerifyPassword(e.target.value)}}/>
              ) : (
              <input required value={verifyPassword} placeholder="Password" type="password" onChange={(e)=>{
                setVerifyPassword(e.target.value)}}/>
              )
            }
          </div>
          <div className="buttons">
            <button onClick={register} id="sign-btn">REGISTER</button>      
            <button onClick={toggleForm}>BACK</button>      
          </div>
        </div> 
      ) : (
        <div className="form-card">
          <h1>Welcome to Skylan</h1>
          <div className="inputs">
          { isEmailError[0] && email.length < 1 ? ( 
            <input className="input-error" required value={email} placeholder={isEmailError[1]} type="email" onChange={(e)=> {
              setEmail(e.target.value)}}/> 
            ) : (
            <input required value={email} placeholder="Email" type="email" onChange={(e)=> {
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
      )}
    </div>
    <div className="login-right-container">
    <img src={LoginSideImg} alt="sideImg" id="login-image" />
    </div>
  </div>
)}

export default Login