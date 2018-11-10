import axios from 'axios';

export function toggleIcon(id, type, status)
{
  return new Promise((resolve, reject) =>
  {
    axios.post('http://127.0.0.1:5002/api/update_entry_status', {
      params: {
        entry_id: id,
        type: type,
        status: status,
      }
    })
    .then((response) => {
      resolve(response);
    })
    .catch((error)=>{
      reject(error);
    });
  })
}
