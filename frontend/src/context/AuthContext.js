import useAuth from '../helpers/useAuth';
import React from 'react'

const AuthContext = React.createContext()

const useAuthContext = () => useContext(AuthContext)
const AuthProvider = ({children}) => {
  const auth = useAuth()
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export { useAuthContext, AuthProvider}