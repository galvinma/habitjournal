export function updateAllEntries()
{
  this.returnAllDatabaseEntries()
  .then((response) => {
      this.getBullets()
      this.getHabitEntries()
      this.getCalendarEntries()
  })
  .catch((error)=>{
    console.log(error);
  });
}
