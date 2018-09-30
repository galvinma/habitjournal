import axios from 'axios';

export function sendSignUpCredentials(firstname, lastname, email, password) {
  axios.post('http://127.0.0.1:5002/api/signup', {
    params: {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
