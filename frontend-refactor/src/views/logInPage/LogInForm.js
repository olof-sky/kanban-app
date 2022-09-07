import React, { useState, useEffect } from "react"
import { useAuthContext  } from '../../context/AuthContext'
import '../../styles/views/LoginPage.scss'
import { getUser, login } from "../../helpers/request";

function LogInForm (props) {
  const {parentCallback} = props;
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [isEmailError,setIsEmailError] = useState([false, ""]);
  const [isPasswordError,setIsPasswordError] = useState([false, ""]);

  const { setUser, setLoggedIn } = useAuthContext();

  useEffect(() => {
    getUser().then((user) => {
      if (user) {
        setUser(user);
        setLoggedIn(true);
      }
    });
  }, []);

  async function handleLogin() {
    resetErrors();
    let isError = false;
    if (!email) setIsEmailError([true, "Email is empty"]), (isError = true);
    if (!password)
      setIsPasswordError([true, "Password is empty"]), (isError = true);
    if (isError) return;

    login(email, password).then((response) => {
      if (response.status === 200) {
        sessionStorage.setItem("Token", response.headers.authorization);
        sessionStorage.setItem("Refresh-Token", response.headers.refreshToken);
        getUser()
          .then((user) => {
            if (user) {
              setUser(user);
              setLoggedIn(true);
            }
          })
          .catch((err) => {
            if (err.response.data.EmailError) {
              setIsEmailError([true, err.response.data.EmailError]);
              setEmail("");
            }
            if (err.response.data.PasswordError) {
              setIsPasswordError([true, err.response.data.PasswordError]);
              setPassword("");
            }
          });
      }
    });
  }

  const toggleForm = () => {
    resetErrors();
    resetFields();
    parentCallback();
  };

  const resetErrors = function () {
    setIsEmailError([false, ""]);
    setIsPasswordError([false, ""]);
  };

  const resetFields = function () {
    setEmail("");
    setPassword("");
  };

  return (
    <div className="form-card">
      <h1>Welcome to Skylan</h1>
      <div className="inputs">
        {isEmailError[0] && email.length < 1 ? (
          <input
            autoFocus
            className="input-error"
            required
            value={email}
            placeholder={isEmailError[1]}
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        ) : (
          <input
            autoFocus
            required
            value={email}
            placeholder="Email"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        )}
        {isPasswordError[0] && password.length < 1 ? (
          <input
            className="input-error"
            required
            value={password}
            placeholder={isPasswordError[1]}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        ) : (
          <input
            required
            value={password}
            placeholder="Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        )}
      </div>
      <div className="buttons">
        <button id="sign-btn" onClick={handleLogin}>
          SIGN IN
        </button>
        <button id="register-btn" onClick={toggleForm}>
          REGISTER
        </button>
      </div>
    </div>
  );
}

export default LogInForm;