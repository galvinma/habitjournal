import axios from 'axios';

export function toggleIcon(id, type, status)
{
  axios.post('http://127.0.0.1:5002/api/update_entry_status', {
    params: {
      entry_id: id,
      type: type,
      status: status,
    }
  })
  .then((response) => {
    console.log(response)

  })
  .catch((error)=>{
    console.log(error);
  });
}
