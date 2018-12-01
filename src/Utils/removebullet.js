import axios from 'axios';

export function removeBullet(id)
{
  axios.post('http://127.0.0.1:5002/api/remove_entry', {
    params: {
      entry_id: id
    }
  })
  .then((response) => {
    this.returnAllDatabaseEntries()
    .then((response) => {
        this.getBullets()
    })
    .catch((error)=>{
      console.log(error);
    });

  })
  .catch((error)=>{
    console.log(error);
  });
}
