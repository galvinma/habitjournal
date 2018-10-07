import axios from 'axios';
import store from '.././Store/store'
import {getAuthStatus, getCurrentUser} from '.././Actions/actions'

export function checkAuth() {
  axios.post('http://127.0.0.1:5002/api/checktoken', {
    params: {
      user: sessionStorage.getItem('user'),
      token: sessionStorage.getItem('token'),
    }
  })
  .then(function (response) {
    store.dispatch(getAuthStatus({
      auth_status: true,
    }))
    store.dispatch(getCurrentUser({
      user: response.data.user,
    }))
  })
  .catch(function (error) {
    console.log(error);
  });
}
