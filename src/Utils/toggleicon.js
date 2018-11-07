import axios from 'axios';

export function toggleIcon(id, type, status)
{

  axios.post('http://127.0.0.1:5002/api/update_bullet_status', {
    params: {
      bullet_id: id,
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
