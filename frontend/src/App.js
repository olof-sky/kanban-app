import logo from './logo.svg';
import React from 'react'
import './App.css'
// import Project from './views/Project'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a href="/mainpage">Main Page</a>
        <a href="/login">Login</a>
        <a href="/createproject">Create Project</a>
      </header>
    </div>
  );
}
export default App;
