import axios from 'axios';
import { mdiCheck, mdiClose } from '@mdi/js'

// redux
import store from '.././Store/store'
import { getAllEntries } from '.././Actions/actions'

export function removeEntry(id)
{
  // UI
  let entries = store.getState().all_entries.all_entries
  let updated = entries.filter(entry => entry.entry_id !== id)

  store.dispatch(getAllEntries({
    all_entries: updated,
  }))

  this.updateAllUIEntries()

  // DB
  axios.post(`${process.env.REACT_APP_DAISY_JOURNAL_API_URI}/api/remove_entry`, {
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
