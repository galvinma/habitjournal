import moment from 'moment'
import { mdiCheck, mdiClose } from '@mdi/js'

// redux
import store from '.././Store/store'
import { connect } from "react-redux";
import { getStoreHabits, getStoreHabitEntries } from '.././Actions/actions'


export function renderLoggedHabits()
{
  store.getState().habit_entries.habit_entries.forEach(entry =>
  {
    var id = entry.habit_id+"_"+moment.unix(entry.start_date).format('YYYY-MM-DD')
    if (document.getElementById(id))
    {
      if (entry.status === "1")
      {
        var cell = document.getElementById("cell"+id)
        var svg = cell.firstChild
        svg.setAttribute("value", "1")
        svg.firstChild.setAttribute("d",mdiCheck)
      }
    }
    if (document.getElementById(id))
    {
      if (entry.status === "0")
      {
        var cell = document.getElementById("cell"+id)
        var svg = cell.firstChild
        svg.setAttribute("value", "0")
        svg.firstChild.setAttribute("d",mdiClose)
      }
    }
  })
}
