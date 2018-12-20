export function updateCalendarEntries()
{
  this.returnAllDatabaseEntries()
  .then((response) => {
      this.getCalendarEntries()
  })
  .catch((error)=>{
    console.log(error);
  });
}
