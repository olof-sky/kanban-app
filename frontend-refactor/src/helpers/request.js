import axios from "axios";

export const login = async (email, password) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
    {
      email,
      password,
    }
  );
  return response;
};

export const getUser = async () => {
  try {
    if (sessionStorage.getItem("Token")) {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/getLoggedInUser`,
        { headers: { Authorization: sessionStorage.getItem("Token") } }
      );
      if (response.status === 200) {
        sessionStorage.setItem("User", JSON.stringify(response.data));
        return response.data;
      }
      return null;
    } else {
      console.log("No user token found");
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

export const logout = () => {
  const header = sessionStorage.getItem("User");
  const resp = axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/api/auth/logout`,
    { headers: { User: header } }
  );
  if (resp) {
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("Refresh-Token");
    sessionStorage.removeItem("User");
    return true;
  }
  return false;
};