import axios from 'axios';
import moment from 'moment'
import { mdiCheck, mdiClose } from '@mdi/js'

// redux
import store from '.././Store/store'
import { connect } from "react-redux";
import { getStoreHabitEntries } from '.././Actions/actions'

export function getHabitEntries()
{
  axios.post('http://127.0.0.1:5002/api/return_entries', {
    params: {
      user: sessionStorage.getItem('user'),
    }
  })
  .then((response) => {
    var res = response.data.entries
    var new_entries = []
    res.forEach(entry => {
      if (entry.type === 'habit')
      {
        new_entries.push(entry)
      }
    })

    this.setState({
      habit_entries: new_entries,
    }, () => {
      // This call catches if the user toggles between routes quickly and the original dispatch call had not competed
      this.renderLoggedHabits()
    })

    store.dispatch(getStoreHabitEntries({
      habit_entries: new_entries,
    }))

  })
  .catch((error)=>{
    console.log(error);
  });
}
