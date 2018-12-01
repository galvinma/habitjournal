import axios from 'axios';
import moment from 'moment'

export function updateBulletTimes(id, event, state)
{
  axios.post('http://127.0.0.1:5002/api/update_entry_time', {
    params: {
      entry_id: id,
      new_time: moment(event).unix(),
      state: state,
    }
  })
  .then((response) => {
    console.log(response)

  })
  .catch((error)=>{
    console.log(error);
  });

  this.returnAllDatabaseEntries()
  .then((response) => {
      this.getBullets()
  })
  .catch((error)=>{
    console.log(error);
  });
}
