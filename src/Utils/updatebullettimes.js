import axios from 'axios';
import moment from 'moment'

// redux
import store from '.././Store/store'
import { getSnackBarState, getSnackBarMessage } from '.././Actions/actions'

// Functions
import { verifyUnixInputs } from './verifyunixinputs'
import { startTimeBeforeEndTime } from './starttime_before_endtime'

export function updateBulletTimes(entry_id, event, state)
{
  // Validate times
  var res = store.getState().all_entries.all_entries
  let old_start_time
  let old_end_time

  for (var i=0; i<res.length; i++)
  {
    if (res[i].entry_id === entry_id)
    {
      old_end_time = res[i].end_time
      old_start_time = res[i].start_time
      break
    }
  }

  if (state === "start_time")
  {
    if (verifyUnixInputs(moment(event).unix(), old_end_time) === false)
    {
      startTimeBeforeEndTime()
      return
    }
  }
  else
  {
    if (verifyUnixInputs(old_start_time, moment(event).unix()) === false)
    {
      startTimeBeforeEndTime()
      return
    }
  }

  // Update UI
  let updates = {entry_id: entry_id, [state]: moment(event).unix()}
  this.updateStoreEntry(updates)
  .then(this.updateAllUIEntries())

  axios.post(`${process.env.REACT_APP_DAISY_JOURNAL_API_URI}/api/update_entry`, {
    params: {
      entry_id: entry_id,
      [state]: moment(event).unix(),
    }
  })
  .then((response) => {
    console.log(response)

  })
  .catch((error)=>{
    console.log(error);
  });
}
