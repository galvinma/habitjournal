import moment from 'moment'

export function removeOldCalendarEntries()
{
  var count = 1;

  while (count <= this.state.daysInMonth) {
    var date_to_compare = String(moment().month(this.state.selectedMonth).date(count).format(`dddd, MMMM Do, YYYY`));
    var node = document.getElementById(date_to_compare)
    node.innerHTML = ""
    count++
  }
}
