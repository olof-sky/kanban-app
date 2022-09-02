import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './views/logInPage/LoginPage';
import NavBar from './components/NavBar'
import { AuthProvider } from './context/AuthContext'
import './styles/App.scss'

class App extends React.Component {
  render() {
    return ( 
      <div className="App">
        <main>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                { !this.loggedIn && <Route path="/" element={<LoginPage/>} exact/> }
                { this.loggedIn &&
                <div>
                  <NavBar/>
                  <h1>Test</h1>
                </div>}
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </main>
      </div>
    )
  }
}

export default App;