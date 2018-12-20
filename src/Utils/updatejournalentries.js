export function updateJournalEntries()
{
  return new Promise((resolve, reject) => {
    this.returnAllDatabaseEntries()
    .then((response) => {
        this.getBullets()
        resolve()
    })
    .catch((error)=>{
      console.log(error);
      reject()
    });
  })
}
