import axios from 'axios';
import moment from 'moment'

// redux
import store from '.././Store/store'
import { connect } from "react-redux";
import { getAllEntries } from '.././Actions/actions'

export function returnAllDatabaseEntries()
{
  return new Promise(function(resolve, reject) {
    axios.post(`${process.env.REACT_APP_DAISY_JOURNAL_API_URI}/api/return_entries`, {
      params: {
        user: localStorage.getItem('user'),
      }
    })
    .then((response) => {
      console.log(response)
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
