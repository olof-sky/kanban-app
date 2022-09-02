import React, {useState, useContext, createContext} from 'react'
const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const auth = useAuth()
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)

export const useAuth = () => {
  const [loggedIn, setLogin] = useState(false)
  const [user, setUser] = useState(null)

  async function getLoggedInUser() {
    try { 
      if (sessionStorage.getItem('Token')) {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/getLoggedInUser`, { headers: { Authorization:sessionStorage.getItem('Token') }})
        if (response.status === 200) {
          sessionStorage.setItem('User', JSON.stringify(response.data));
          setUser(JSON.stringify(response.data))
          setLogin(true);
        }
        else return false;
      }
      else (console.log("No user token found"));
      }
    catch(err) {
      setLogin(false);
      console.log(err)
    }
  }
      
  async function logout() {
    const header = sessionStorage.getItem('User')
    const resp = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/auth/logout`, { headers: { User:header }})
    if (resp) {
      setLogin(false);
      sessionStorage.removeItem('Token');
      sessionStorage.removeItem('Refresh-Token');
      sessionStorage.removeItem('User');
    }
  }

  return { user, loggedIn }
}