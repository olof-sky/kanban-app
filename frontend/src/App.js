import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import {AuthProvider} from './context/AuthContext'
import LoginPage from './views/LoginPage';
import Projects from './views/Projects';
import Project from './views/Project';
import Calendar from './views/Calendar';
import Profile from './views/Profile';
import Team from './views/Team';
import NavBar from './components/NavBar'
import { refreshToken } from './helpers/helper'
import './styles/App.scss'

function App() {
  const [loggedIn, login] = useState(false)

  // // Logout if token expired
  // setInterval(async function() {
  //   if (!loggedIn) return;
  //   try {
  //     const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/secure`, { headers: { Authorization:sessionStorage.getItem('Token') }})
  //     if (response.status === 200) {return refreshToken()}}
  //   catch(err) {
  //     logIn(false);
  //     sessionStorage.removeItem('Token');
  //     sessionStorage.removeItem('Refresh-Token');
  //     sessionStorage.removeItem('User');
  //     window.location = "/"
  //   }
  // }, 1000*60*14);

  // useEffect(() => {
  //   getLoggedInUser();
  // }, []);

  if (!loggedIn) {
    return ( 
      <div className="App">
        <main>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage login={login}/>} exact/>
            </Routes>
          </BrowserRouter>
        </main>
      </div>
    )
  }
  
  if (loggedIn) {
    return (
      <div className="App">
        <header>
          <NavBar/>
        </header>
        <main>
          <AuthProvider loggedIn={loggedIn}>
            <BrowserRouter>
              <Routes>
                <Route path="/calendar" element={ <Calendar/> } exact/>
                <Route path="/team" element={ <Team/> } exact/>
                <Route path="/projects" element={ <Projects/> } exact/>
                <Route path="/projects/:id" element={ <Project/> } exact/>
                <Route path="/profile/:id" element={ <Profile/> } exact/>
                <Route path="/profile" element={ <Profile/> } exact/>
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </main>
      </div>
    )
  };
}
export default App;
