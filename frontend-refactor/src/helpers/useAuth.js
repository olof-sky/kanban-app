
const validator = require("email-validator");

const useAuth = () => {
  const login = async () => {
    //validate
    // resetErrors()
    // let isError = false
    // if(!validator.validate(email)) ( setIsEmailError([true, `Email is not valid`]), setEmail(""));
    // if (!email) ( setIsEmailError([true, "Email is empty"]), isError = true);
    // if (!password) ( setIsPasswordError([true, "Password is empty"]), isError = true);
    // if(isError) return;    
    //submit
    try {
      const resp = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, 
      { email: email, password: password }
      )
      if (resp) {
        let token = resp.headers.authorization;
        let refreshToken = resp.headers['refresh-token'];
        sessionStorage.setItem('Token', token);
        sessionStorage.setItem('Refresh-Token', refreshToken);
        axios.defaults.headers.common['Authorization'] = token;
        axios.defaults.headers.common['Refresh-Token'] = refreshToken;
      }
    }
    catch(err) {
      if(err.response.data.EmailError) {
        // setIsEmailError([true, err.response.data.EmailError])
        // setEmail("");
      }
      if(err.response.data.PasswordError) {
        // setIsPasswordError([true, err.response.data.PasswordError]);
        // setPassword("");
      }
    }
  }

  async function getLoggedInUser() {
    try { 
      if (sessionStorage.getItem('Token')) {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/getLoggedInUser`, { headers: { Authorization:sessionStorage.getItem('Token') }})
        if (response.status === 200) {
          sessionStorage.setItem('User', JSON.stringify(response.data));
          login(true);
        }
        else return false;
      }
      else (console.log("No user token found"));
      }
    catch(err) {
      login(false);
      console.log(err)
    }
  }
      
  const logout = async () => {
    const header = sessionStorage.getItem('User')
    const resp = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/auth/logout`, { headers: { User:header }})
    if (resp) {
      login(false);
      sessionStorage.removeItem('Token');
      sessionStorage.removeItem('Refresh-Token');
      sessionStorage.removeItem('User');
    }
  }
  return { login, logout, getLoggedInUser }
}

export default useAuth;