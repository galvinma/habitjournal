import axios from 'axios';
import moment from 'moment'

export function addBullet()
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

  axios.post('http://127.0.0.1:5002/api/save_entry', {
    params: {
      user: sessionStorage.getItem('user'),
      type: this.state.type,
      title: this.state.title,
      start_date: this.state.startDate,
      end_date: endDate,
      start_time: this.state.startTime,
      end_time: endTime,
      multi_day: this.state.checkedMultiDay,
      all_day: this.state.checkedAllDay,
    }
  })
  .then((response) => {
    this.setState({
      title: ""
    });
    document.getElementById("bulletSelector").value = ""

    this.returnAllDatabaseEntries()
    .then((response) => {
        this.getBullets()
    })
    .catch((error)=>{
      console.log(error);
    });
  })
  .catch((error) => {
    console.log(error);
  });
}
