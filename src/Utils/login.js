import axios from 'axios';

export function sendLogInCredentials(email, password) {
  axios.post('http://127.0.0.1:5002/api/login', {
    params: {
      email: email,
      password: password,
    }
  })
  .then((response) => {
    console.log(response.data)
    return response.data
  })
  .catch((error)=>{
    console.log(error);
  });
}
