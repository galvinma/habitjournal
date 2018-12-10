import axios from 'axios';
import moment from 'moment'
import { mdiCheck, mdiClose } from '@mdi/js'


// redux
import store from '.././Store/store'
import { getAllEntries, getHabitsClickLock } from '.././Actions/actions'

export function logHabit(...parameters)
{
  // Get current status
  let cell = document.getElementById("cell"+parameters[0].habit_id+"_"+moment(parameters[0].start_date).format('YYYY-MM-DD'))
  let svg = cell.firstChild
  let status = svg.getAttribute('value')
  let entryID = svg.getAttribute('id')

  // Prevent double click
  let split = entryID.split("_")
  if (split[0] === "TEMP")
  {
    console.log("Returning due to temp ID")
    return
  }

  // If status is currently "1", remove the entry from the store and delete in mongodb
  // if status is currently "0" (unchecked), add the entry to both the store and mongodb
  if (status === "1")
  {
    // Remove entry from store and db
    this.removeEntry(entryID)

    // Remove entry from UI
    svg.setAttribute("value", "0")
    svg.setAttribute("id", parameters[0].habit_id+"_"+moment(parameters[0].start_date).format('YYYY-MM-DD'))
    svg.firstChild.setAttribute("d",mdiClose)

  }
  else
  {
    // Create a new entry in store and db
    status = "1"

    // Update UI
    let temp_id = "TEMP_"+String(this.state.IDCount)
    this.setState({ IDCount: this.state.IDCount + 1})

    var entries = store.getState().all_entries.all_entries
    entries.push({
      entry_id: temp_id,
      user_id: sessionStorage.getItem('user'),
      type: 'habit',
      title: parameters[0].title,
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
    axios.post('https://daisyjournal.com/api/log_habit', {
      params: {
        user: sessionStorage.getItem('user'),
        type: this.state.type,
        title: parameters[0].title,
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
}
