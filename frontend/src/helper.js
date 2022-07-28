import axios from 'axios'

export async function refreshToken () {
  try {const res = await axios.get('http://localhost:3002/api/auth/refreshToken', 
      { headers: { Authorization:sessionStorage.getItem('Refresh-Token') } }
    )
    if (res.status === 200) {
      let token = res.headers.authorization;
      let refreshToken = res.headers['refresh-token'];
      sessionStorage.setItem('Token', token);
      sessionStorage.setItem('Refresh-Token', refreshToken);
      axios.defaults.headers.common['Authorization'] = token;
      axios.defaults.headers.common['Refresh-Token'] = refreshToken;
    }
  }
  catch (err) {}
}

export async function isSecure () {
  axios.get("http://localhost:3002/secure", { headers: { Authorization:sessionStorage.getItem('Token') }})
  .then((res) => {
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  })
}

export default (refreshToken, isSecure)