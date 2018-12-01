// redux
import store from '.././Store/store'
import { connect } from "react-redux";
import { getAllEntries } from '.././Actions/actions'

export function updateStoreEntry(...parameters)
{
  return new Promise(function(resolve, reject) {
    // Find all instances of entry ID in the store
    var entries = store.getState().all_entries.all_entries
    entries.forEach(entry => {
      if (parameters[0].entry_id === entry.entry_id)
      {
        // Replace entry with supplied parameters
        for (var key in parameters[0])
        {
          if (entry[key])
          {
            entry[key] = parameters[0][key]
          }
        }
      }
    })

    store.dispatch(getAllEntries({
      all_entries: entries,
    }))

    resolve()
  })
}
