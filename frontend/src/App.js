import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import CreateProject from './views/CreateProject';
import Login from './views/LoginPage';
import MainPage from './views/MainPage';
import './styles/App.scss'

function App() {
  const [loggedIn, logIn] = useState(false);

  // Logout after 15 min if token expired
  setInterval(async function() {
    if (!loggedIn) return;
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/secure`, { headers: { Authorization:sessionStorage.getItem('Token') }})
      if (response.status === 200) return }
    catch(err) {
      logIn(false);
      sessionStorage.removeItem('Token');
      sessionStorage.removeItem('Refresh-Token');
      sessionStorage.removeItem('User');
      window.location = "/"
    }
  }, 1000*60*15);

  useEffect(() => {
    getLoggedInUser();
  }, []);

  async function getLoggedInUser() {
    try { 
      if (sessionStorage.getItem('Token')) {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/getLoggedInUser`, { headers: { Authorization:sessionStorage.getItem('Token') }})
        if (response.status === 200) {
          sessionStorage.setItem('User', JSON.stringify(response.data));
          logIn(true);
        }
        else return false;
      }
      else (console.log("No user token found"));
      }
    catch(err) {
      console.log(err)
    }
  }
  
  const logout = async () => {
    const header = sessionStorage.getItem('User')
    const resp = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/auth/logout`, { headers: { User:header }})
    if (resp) {
      logIn(false);
      sessionStorage.removeItem('Token');
      sessionStorage.removeItem('Refresh-Token');
      sessionStorage.removeItem('User');
      window.location = "/"
    }
  }

  if (!loggedIn) {
    return ( 
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<Login/>} exact/>
          </Routes>
        </main>
      </div>
    )
  }
  
  if (loggedIn) {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/" className="link">Main Page</Link>
            <Link to="/createproject" className="link">Create Project</Link>
            <button onClick={logout}>Logout</button>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={ <MainPage/> } exact/>
            <Route path="/createproject" element={ <CreateProject/> } exact/>
          </Routes>
        </main>
      </div>
    )};
}
export default App;
