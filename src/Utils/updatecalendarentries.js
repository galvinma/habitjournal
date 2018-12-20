export function updateCalendarEntries()
{
  return new Promise((resolve, reject) => {
    this.returnAllDatabaseEntries()
    .then((response) => {
        this.getCalendarEntries()
        resolve()
    })
    .catch((error)=>{
      console.log(error);
      reject()
    });
  })
}
