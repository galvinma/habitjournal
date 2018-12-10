import axios from 'axios';
import store from '.././Store/store'
import {getAuthStatus, getCurrentUser} from '.././Actions/actions'

export function checkAuth() {
  axios.post('https://daisyjournal.com/api/checktoken', {
    params: {
      user: sessionStorage.getItem('user'),
      token: sessionStorage.getItem('token'),
    }
  })
  .then(function (response) {
    store.dispatch(getAuthStatus({
      auth_status: response.data.allow,
    }))
    store.dispatch(getCurrentUser({
      user: response.data.user,
    }))
  })
  .catch(function (error) {
    console.log(error);
  });
}
