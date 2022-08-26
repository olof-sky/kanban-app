import React, {useState} from "react"
import '../../styles/views/LoginPage.scss'
import login from '../../helpers/useAuth'

function LogInForm (props) {
  const {parentCallback, login} = props;
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [isEmailError,setIsEmailError] = useState([false, ""]);
  const [isPasswordError,setIsPasswordError] = useState([false, ""]);

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