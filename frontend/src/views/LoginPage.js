import React,{useState} from 'react';
import LoginSideImg from '../assets/LoginSideImg.png'
import LogInForm from '../components/LogInPage/LogInForm'
import RegisterForm from '../components/LogInPage/RegisterForm'

import '../styles/views/LoginPage.scss'

function LoginPage(props) {
  const {loggedIn, login} = props;
  const [showRegister,showRegisterForm] = useState(false);

  const toggleForm = function () {
    if (!showRegister) {
      showRegisterForm(true)
    }
    else showRegisterForm(false);
  }
  
  return (
    <div className="login-body">
      <div className="login-left-container">
        { !showRegister ? ( 
          <LogInForm 
            login={login}
            parentCallback={toggleForm}
          /> 
          ) : ( 
          <RegisterForm 
            parentCallback={toggleForm}/> 
          ) 
        }
      </div>
      <div className="login-right-container">
      <img src={LoginSideImg} alt="sideImg" id="login-image" />
      </div>
    </div>
  )
}

export default LoginPage