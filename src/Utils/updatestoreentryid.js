// redux
import store from '.././Store/store'
import { getAllEntries, getHabitsClickLock } from '.././Actions/actions'

export function updateStoreEntryId(...parameters)
{
  return new Promise(function(resolve, reject) {
    var entries = store.getState().all_entries.all_entries
    entries.forEach(entry => {
      if (parameters[0].temp_id === entry.entry_id)
      {
        entry.entry_id = parameters[0].entry_id
      }

      // Update the UI entry ID
      if (document.getElementById(parameters[0].temp_id))
      {
        document.getElementById(parameters[0].temp_id).setAttribute("id", parameters[0].entry_id)
      }
    })

    store.dispatch(getAllEntries({
      all_entries: entries,
    }))

    resolve()
  })
}
