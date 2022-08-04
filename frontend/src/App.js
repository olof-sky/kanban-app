import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Login from './views/LoginPage';
import Projects from './views/Projects';
import Calendar from './views/Calendar';
import Profile from './views/Profile';
import Team from './views/Team';
import NavBar from './components/NavBar'
import './styles/App.scss'

function App() {
  const [loggedIn, logIn] = useState(false);

  // Logout after 3h if token expired
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
      window.location = "/projects"
    }
  }, 1000*60*60*3);

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
        <header>
          <NavBar logout={logout}/>
        </header>
        <main>
          <Routes>
            <Route path="/calendar" element={ <Calendar/> } exact/>
            <Route path="/team" element={ <Team/> } exact/>
            <Route path="/projects" element={ <Projects/> } exact/>
            <Route path="/profile" element={ <Profile/> } exact/>
          </Routes>
        </main>
      </div>
    )};
}
export default App;
