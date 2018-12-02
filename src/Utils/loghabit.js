import axios from 'axios';
import moment from 'moment'

// redux
import store from '.././Store/store'
import { getAllEntries } from '.././Actions/actions'

export function logHabit(...parameters)
{
  let temp_id = "TEMP_"+String(this.state.IDCount)
  this.setState({ IDCount: this.state.IDCount + 1})

  // Get current status
  let cell = document.getElementById("cell"+parameters[0].habit_id+"_"+moment(parameters[0].start_date).format('YYYY-MM-DD'))
  let svg = cell.firstChild
  let status = svg.getAttribute('value')
  // Set new status
  if (status === "1")
  {
    status = "0"
  }
  else
  {
    status = "1"
  }

  // Update UI
  var entries = store.getState().all_entries.all_entries
  entries.push({
    entry_id: temp_id,
    user_id: sessionStorage.getItem('user'),
    type: 'habit',
    title: "",
    start_date: moment(parameters[0].start_date, "YYYY/MM/DD").unix(),
    end_date: moment(parameters[0].start_date, "YYYY/MM/DD").unix(),
    start_time: moment(parameters[0].start_date, "YYYY/MM/DD").startOf('day').unix(),
    end_time: moment(parameters[0].start_date, "YYYY/MM/DD").endOf('day').unix(),
    multi_day: false,
    all_day: true,
    habit_id: parameters[0].habit_id,
    description: "",
    status: status,
  })

  store.dispatch(getAllEntries({
    all_entries: entries,
  }))

  this.updateAllUIEntries()

  // Update DB
  axios.post('http://127.0.0.1:5002/api/log_habit', {
    params: {
      user: sessionStorage.getItem('user'),
      type: this.state.type,
      title: "",
      start_date: moment(parameters[0].start_date, "YYYY/MM/DD").unix(),
      end_date: moment(parameters[0].start_date, "YYYY/MM/DD").unix(),
      start_time: moment(parameters[0].start_date, "YYYY/MM/DD").startOf('day').unix(),
      end_time: moment(parameters[0].start_date, "YYYY/MM/DD").endOf('day').unix(),
      multi_day: false,
      all_day: true,
      habit_id: parameters[0].habit_id,
      description: "",
      status: status,
    }
  })
  .then((response) => {
    let parameters = {temp_id: temp_id, entry_id: response.data.entry_id}
    this.updateStoreEntryId(parameters)
    .then((response) => {
      this.updateAllUIEntries()
    })
    .catch((error) => {
      console.log(error);
    });


  })
  .catch((error) => {
    console.log(error);
  });
}
