import axios from 'axios';
import moment from 'moment'

// redux
import store from '.././Store/store'
import { getAllEntries } from '.././Actions/actions'
import { getSnackBarState, getSnackBarMessage } from '.././Actions/actions'

// Functions
import { verifyUnixInputs } from './verifyunixinputs'
import { startDateBeforeEndDate } from './startdate_before_enddate'
import { startTimeBeforeEndTime } from './starttime_before_endtime'
import { sameDay } from './same_day'
import { missingTitle } from './missing_title'

export function addEntry()
{
  let endDate
  let endTime
  let allDay

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

  // verify date and times and valid
  if (verifyUnixInputs(this.state.startDate, endDate) === false)
  {
    startDateBeforeEndDate()
    return
  }

  if (verifyUnixInputs(this.state.startTime, endTime) === false)
  {
    startTimeBeforeEndTime()
    return
  }

  if (this.state.checkedMultiDay === true &&
      this.state.startDate === endDate)
  {
    sameDay()
    return
  }

  if (document.getElementById("bulletSelector").value === "")
  {
    missingTitle()
    return
  }

  if (endDate === moment.unix(this.state.startDate).startOf('day').unix() &&
      endTime === moment.unix(this.state.startDate).endOf('day').unix())
  {
    allDay = true
  }
  else
  {
    allDay = false
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
    user_id: localStorage.getItem('user'),
    type: this.state.type,
    title: val,
    start_date: this.state.startDate,
    end_date: endDate,
    start_time: this.state.startTime,
    end_time: endTime,
    multi_day: this.state.checkedMultiDay,
    all_day: allDay,
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
      user: localStorage.getItem('user'),
      type: this.state.type,
      title: val,
      start_date: this.state.startDate,
      end_date: endDate,
      start_time: this.state.startTime,
      end_time: endTime,
      multi_day: this.state.checkedMultiDay,
      all_day: allDay,
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
