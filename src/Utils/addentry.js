import axios from 'axios';
import moment from 'moment'

// redux
import store from '.././Store/store'
import { getAllEntries } from '.././Actions/actions'

export function addEntry()
{
  let endDate
  let endTime

  if (this.state.checkedMultiDay === false && this.state.checkedAllDay === true)
  {
    // Single Day / All Day
    // Set end date and time
    endDate = moment.unix(this.state.startDate).startOf('day').unix()
    endTime = moment.unix(this.state.startDate).endOf('day').unix()
  }
  else if (this.state.checkedMultiDay === true && this.state.checkedAllDay === false )
  {
    // Multi / Timed
    // Use set values
    endDate = this.state.endDate
    endTime = this.state.endTime
  }
  else if (this.state.checkedMultiDay === true && this.state.checkedAllDay === true )
  {
    // Multi Day / All Day
    // Set end time
    endDate = this.state.endDate
    endTime = moment.unix(this.state.endDate).endOf('day').unix()
  }
  else if (this.state.checkedMultiDay === false && this.state.checkedAllDay === false )
  {
    // Single Day / Timed
    // Set end date and time
    endDate = moment.unix(this.state.startDate).startOf('day').unix()
    endTime = this.state.endTime
  }

  let val = document.getElementById("bulletSelector").value
  let temp_id = "TEMP_"+String(this.state.IDCount)

  this.setState({ IDCount: this.state.IDCount + 1})

  // Update UI

  this.setState({
    title: ""
  });

  document.getElementById("bulletSelector").value = ""

  var entries = store.getState().all_entries.all_entries
  entries.push({
    entry_id: temp_id,
    user_id: sessionStorage.getItem('user'),
    type: this.state.type,
    title: val,
    start_date: this.state.startDate,
    end_date: endDate,
    start_time: this.state.startTime,
    end_time: endTime,
    multi_day: this.state.checkedMultiDay,
    all_day: this.state.checkedAllDay,
    habit_id: null,
    description: "",
    status: "0"
  })

  store.dispatch(getAllEntries({
    all_entries: entries,
  }))

  this.updateAllUIEntries()

  // Update DB
  axios.post(`${process.env.REACT_APP_DAISY_JOURNAL_API_URI}/api/save_entry`, {
    params: {
      user: sessionStorage.getItem('user'),
      type: this.state.type,
      title: val,
      start_date: this.state.startDate,
      end_date: endDate,
      start_time: this.state.startTime,
      end_time: endTime,
      multi_day: this.state.checkedMultiDay,
      all_day: this.state.checkedAllDay,
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
