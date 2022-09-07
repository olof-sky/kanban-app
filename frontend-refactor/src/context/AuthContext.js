import React, { useState, useContext, createContext } from 'react'
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const auth = useAuth();
  return (
    <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)

export const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  console.log("user", user);
  console.log("loggedIn", loggedIn);

  return { user, loggedIn, setLoggedIn, setUser };
};