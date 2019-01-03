// redux
import store from '.././Store/store'
import { connect } from "react-redux";
import { getAllEntries } from '.././Actions/actions'

export function updateJournalEntries()
{
  return new Promise((resolve, reject) => {
    this.returnAllDatabaseEntries()
    .then((response) => {
        console.log(response.data.entries)
        console.log(store.getState().all_entries.all_entries)
        this.getBullets()
        resolve()
    })
    .catch((error)=>{
      console.log(error);
      reject()
    });
  })
}
