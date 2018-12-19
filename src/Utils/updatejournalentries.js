export function updateJournalEntries()
{
  this.returnAllDatabaseEntries()
  .then((response) => {
      this.getBullets()
  })
  .catch((error)=>{
    console.log(error);
  });
}
