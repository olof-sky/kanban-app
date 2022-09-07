import React from "react";
import { Route, Routes } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext'
import NavBar from '../components/NavBar'
import LoginPage from '../views/logInPage/LoginPage'

const RouteHandler = () => {
    const { loggedIn } = useAuthContext();
  
    if (loggedIn) {
      return (
      <Routes>
        <Route path="/" element={<NavBar />} exact />;
      </Routes>
      )
    } else {
      return (
        <Routes>
          <Route path="/" element={<LoginPage />} exact />;
        </Routes>
      )
    }
  };
  
  export default RouteHandler;