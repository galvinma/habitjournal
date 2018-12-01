import axios from 'axios';
import moment from 'moment'

// functions
import { sortBulletObject } from './sortbullets'

// redux
import store from '.././Store/store'
import { connect } from "react-redux";
import { getAllEntries } from '.././Actions/actions'

export function returnAllDatabaseEntries()
{
  return new Promise(function(resolve, reject) {
    axios.post('http://127.0.0.1:5002/api/return_entries', {
      params: {
        user: sessionStorage.getItem('user'),
      }
    })
    .then((response) => {
      var res = response.data.entries

      store.dispatch(getAllEntries({
        all_entries: res,
      }))

      resolve(response)
    })
    .catch((error)=>{
      console.log(error);
      reject(error)
    });
  })
}
