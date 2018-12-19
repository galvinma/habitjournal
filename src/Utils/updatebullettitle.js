import axios from 'axios';
import { missingTitle } from './missing_title'

export function updateBulletTitle(entry_id, val)
{
  // Update UI
  let updates = {entry_id: entry_id, title: val}
  this.updateStoreEntry(updates)
  .then(this.updateAllUIEntries())

  // Update DB
  axios.post(`${process.env.REACT_APP_DAISY_JOURNAL_API_URI}/api/update_entry`, {
    params: {
      entry_id: entry_id,
      title: val,
    }
  })
  .then((response) => {
    console.log(response)

  })
  .catch((error)=>{
    console.log(error);
  });
}
