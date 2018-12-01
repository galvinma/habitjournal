// redux
import store from '../.././Store/store'
import { connect } from "react-redux";

export function updateEntry(id, ...parameters)
{
  // Find all instances of entry ID in the store
  store.getState().all_entries.all_entries.forEach(entry => {
    if (entry.id === id)
    {

      // Update in the DB

      console.log(parameters)
    }
  })
}
