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
    })

    store.dispatch(getStoreHabitEntries({
      habit_entries: new_entries,
    }))

    new_entries.forEach(entry =>
    {
      var id = entry.habit_id+"_"+moment.unix(entry.start_date).format('YYYY-MM-DD')
      if (document.getElementById(id))
      {
        if (entry.status === "1")
        {
          var cell = document.getElementById("cell"+id)
          var svg = cell.firstChild
          svg.firstChild.setAttribute("d",mdiCheck)
        }
      }
      if (document.getElementById(id))
      {
        if (entry.status === "0")
        {
          var cell = document.getElementById("cell"+id)
          var svg = cell.firstChild
          svg.firstChild.setAttribute("d",mdiClose)
        }
      }
    })

  })
  .catch((error)=>{
    console.log(error);
  });
}
