import axios from 'axios';

export function toggleIcon(entry_id, type, status)
{
  if (status === "0")
  {
    status = "1"
  }
  else
  {
    status = '0'
  }

  // Update UI
  let updates = {entry_id: entry_id, type: type, status: status}
  this.updateStoreEntry(updates)
  .then(this.updateAllUIEntries())

  // Update DB
  axios.post(`${process.env.REACT_APP_DAISY_JOURNAL_API_URI}/api/update_entry`, {
    params: {
      entry_id: entry_id,
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
