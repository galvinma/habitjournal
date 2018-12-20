import axios from 'axios';
import moment from 'moment'
import { mdiCheck, mdiClose } from '@mdi/js'

// redux
import store from '.././Store/store'
import { connect } from "react-redux";
import { getStoreHabitEntries, getLoadingStatus } from '.././Actions/actions'

export function getHabitEntries()
{
    var res = store.getState().all_entries.all_entries
    var new_entries = {}
    res.forEach(entry => {
      if (entry.type === 'habit')
      {
        new_entries[entry.habit_id+"_"+entry.start_date] = entry
      }
    })

    store.dispatch(getStoreHabitEntries({
      habit_entries: new_entries,
    }))

    store.dispatch(getLoadingStatus({
      loading_status: false,
    }))

}
