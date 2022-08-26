import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './views/logInPage/LoginPage';
import NavBar from './components/NavBar'
import './styles/App.scss'

class App extends React.Component {

  render() {
    if (!useAuth.loggedIn) {
      return ( 
        <div className="App">
          <main>
            <AuthProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<LoginPage/>} exact/>
                </Routes>
              </BrowserRouter>
            </AuthProvider>
          </main>
        </div>
      )
    }
    
    if (useAuth.loggedIn) {
      return (
        <div className="App">
          <header>
            <NavBar/>
            <AuthProvider>
              <h1>Test</h1>
            </AuthProvider>
          </header>
          <main>
          </main>
        </div>
      )
    };
  }
}

export default App;