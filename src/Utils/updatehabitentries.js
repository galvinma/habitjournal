export function updateHabitEntries()
{
  this.returnAllDatabaseEntries()
  .then((response) => {
      this.getHabits()
      this.getHabitEntries()
  })
  .catch((error)=>{
    console.log(error);
  });
}
