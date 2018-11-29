import axios from 'axios';

export function updateBulletTitle(entry_id, val)
{
  axios.post('http://127.0.0.1:5002/api/update_entry_title', {
    params: {
      entry_id: entry_id,
      title: val,
    }
  })
  .then((response) => {
    console.log(response)

  })
  .catch((error)=>{
    console.log(error);
  });
}
