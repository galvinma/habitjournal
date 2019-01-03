export function updateJournalEntries()
{
  return new Promise((resolve, reject) => {
    this.returnAllDatabaseEntries()
    .then((response) => {
        console.log(response.date.entries)
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
