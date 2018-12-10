import axios from 'axios';
import moment from 'moment'

export function updateBulletTimes(entry_id, event, state)
{
  // Update UI
  let updates = {entry_id: entry_id, [state]: moment(event).unix()}
  this.updateStoreEntry(updates)
  .then(this.updateAllUIEntries())

  axios.post('https://daisyjournal.com/api/update_entry', {
    params: {
      entry_id: entry_id,
      [state]: moment(event).unix(),
    }
  })
  .then((response) => {
    console.log(response)

  })
  .catch((error)=>{
    console.log(error);
  });
}
