export function updateHabitEntries()
{
  return new Promise((resolve, reject) => {
    this.returnAllDatabaseEntries()
    .then((response) => {
        this.getHabits()
        this.getHabitEntries()
        resolve()
    })
    .catch((error)=>{
      console.log(error);
      reject()
    });
  })
}
