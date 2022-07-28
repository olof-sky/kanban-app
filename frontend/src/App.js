import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import CreateProject from './views/CreateProject';
import Login from './views/LoginPage';
import MainPage from './views/MainPage';

import './App.css'

function App() {
  const [loggedIn, logIn] = useState(false);

  useEffect(() => {
    getLoggedInUser();
  }, []);

  async function getLoggedInUser() {
    const response = await axios.get("http://localhost:3002/api/v1/user/getLoggedInUser", { headers: { Authorization:sessionStorage.getItem('Token') }})
      if (response.status === 200) {
        sessionStorage.setItem('User', JSON.stringify(response.data));
        logIn(true);
      }
      else return false;
  }
  
  const logout = async () => {
    const resp = await axios.put('http://localhost:3002/api/auth/logout', { headers: { Authorization:sessionStorage.getItem('Refresh-Token') }})
    if (resp) {
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
