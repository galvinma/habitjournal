import moment from 'moment'
import { mdiCheck, mdiClose } from '@mdi/js'

export function softUpdateHabitEntries(entry)
{
    var s = entry.split("_")
    var habit_id = s[0]
    var date = moment(s[1], "YYYY/MM/DD").unix()

    var id = habit_id+"_"+moment.unix(date).format('YYYY-MM-DD')

    if (document.getElementById(id))
    {
      var cell = document.getElementById("cell"+id)
      var svg = cell.firstChild

      if (svg.getAttribute('value') === "1")
      {
        svg.setAttribute("value", "0")
        svg.firstChild.setAttribute("d",mdiClose)
      }
      else
      {
        svg.setAttribute("value", "1")
        svg.firstChild.setAttribute("d",mdiCheck)
      }
    }
}
