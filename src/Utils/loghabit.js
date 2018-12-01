import axios from 'axios';
import moment from 'moment'

export function logHabit(id)
{
  var s = id.split("_")
  var habit_id = s[0]
  var date = moment(s[1], "YYYY/MM/DD").unix()
  var starttime = moment(s[1], "YYYY/MM/DD").startOf('day').unix()
  var endtime = moment(s[1], "YYYY/MM/DD").endOf('day').unix()

  axios.post('http://127.0.0.1:5002/api/log_habit', {
    params: {
      user: sessionStorage.getItem('user'),
      habit_id: habit_id,
      type: 'habit',
      start_date: date,
      end_date: date,
      start_time: starttime,
      end_time: endtime,
      multi_day: false,
      all_day: true,
    }
  })
  .then((response) => {
    this.updateAllEntries()
  })
  .catch((error)=>{
    console.log(error);
  });
}
