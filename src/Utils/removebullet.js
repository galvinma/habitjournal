import axios from 'axios';

// redux
import store from '.././Store/store'
import { getAllEntries } from '.././Actions/actions'

export function removeBullet(id)
{
  // UI
  let entries = store.getState().all_entries.all_entries
  let updated = entries.filter(entry => entry.entry_id !== id)

  store.dispatch(getAllEntries({
    all_entries: updated,
  }))

  this.updateAllUIEntries()

  // DB
  axios.post('http://127.0.0.1:5002/api/remove_entry', {
    params: {
      entry_id: id
    }
  })
  .then((response) => {
    console.log(response)
  })
  .catch((error)=>{
    console.log(error);
  });
}
