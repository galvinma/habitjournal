import axios from 'axios';
import moment from 'moment'
import { mdiDotsHorizontal } from '@mdi/js'

// redux
import store from '.././Store/store'
import { connect } from "react-redux";
import { getStoreCalendarEntries, getEntriesModalState, getEntriesModalID, getEditEntriesModalState, getCurrentEntry } from '.././Actions/actions'

// Functions
import { convertToIcon } from './convertoicon'
import { toggleIcon } from './toggleicon'

// Icons
var weatherNight = require('.././Images/Icons/weather-night.svg')
var weatherSunset = require('.././Images/Icons/weather-sunset.svg')

export function getCalendarEntries()
{
    var res = store.getState().all_entries.all_entries

    var new_calendar_entries = {}
    res.forEach(bullet => {
        if (bullet.type !== "note")
        {
          var ref_date = moment.unix(bullet.start_date)
          var start_date = moment.unix(bullet.start_date)
          var end_date = moment.unix(bullet.end_date)

          while (moment(ref_date).isSameOrBefore(moment(end_date), 'days'))
          {
            var temp = Object.assign([], bullet);
            var navMonth = moment(ref_date).format('MMMM, YYYY')

            if (navMonth === moment(this.state.firstDayOfMonthDate).format('MMMM, YYYY'))
            {
              // If entry does not exists, create a bucket
              if (!(new_calendar_entries[moment(ref_date).format('dddd, MMMM Do, YYYY')]))
              {
                new_calendar_entries[moment(ref_date).format('dddd, MMMM Do, YYYY')] = []
              }

              // A multi day event, create clones...
              if (!(moment(start_date).isSame(moment(end_date), 'days')))
              {
                if (moment(ref_date).isSame(moment.unix(bullet.start_date), 'days'))
                {
                  temp.end_time = moment.unix(temp.start_date).endOf('day').unix()
                }

                if (moment(ref_date).isSame(moment.unix(bullet.end_date), 'days'))
                {
                  temp.start_time = moment.unix(temp.end_date).startOf('day').unix()
                }

                if ((moment(ref_date).isAfter(moment.unix(bullet.start_date))) &&
                    (moment(ref_date).isBefore(moment.unix(bullet.end_date))))
                {
                  temp.start_time = moment(ref_date).startOf('day').unix()
                  temp.end_time = moment(ref_date).endOf('day').unix()
                }
              }
              new_calendar_entries[moment(ref_date).format('dddd, MMMM Do, YYYY')].push(temp)
            }
            ref_date = moment(ref_date).add(1, 'days')
          }
        }
    })

    store.dispatch(getStoreCalendarEntries({
      calendar_entries: new_calendar_entries,
    }))

    this.setState({
      calendar_entries: new_calendar_entries,
    }, () =>
      {
        for (var key in new_calendar_entries)
        {
          new_calendar_entries[key].forEach(entry => {
            if (entry.type === 'task' ||
                entry.type === 'event' ||
                entry.type === 'appointment' ||
                (entry.type === 'habit' && entry.status === '1'))
            {
              if (document.getElementById(key))
              {
                // Create the SVG
                var type = convertToIcon(entry)
                var svg = document.createElement("IMG");
                svg.setAttribute('class', String(entry.entry_id))
                svg.className += " calendar_icons"
                svg.setAttribute("src", type)

                var _this = this
                var _entry_id = entry.entry_id

                // This onclick method manipulates the icon appearance instead of rerendering the whole calendar. At a later date the class should use "shouldComponentUpdate" to selectively rerender edited entries.
                svg.onclick = function() {
                    toggleIcon(entry.entry_id, entry.type, entry.status)
                    .then((response) => _this.updateAllEntries())
                    .catch((error) => console.log(error))
                    for (var key in _this.state.calendar_entries)
                    {
                      _this.state.calendar_entries[key].forEach(swap => {
                        if (entry.entry_id === swap.entry_id)
                        {
                          if (swap.status === "0")
                          {
                            var l = document.getElementsByClassName(swap.entry_id)
                            for (var i = 0; i < l.length; i++)
                            {
                              var s = l[i]
                              swap.status = "1"
                              type = convertToIcon(swap)
                              s.setAttribute("src", type)
                            }
                          }
                          else
                          {
                            var l = document.getElementsByClassName(swap.entry_id)
                            for (var i = 0; i < l.length; i++)
                            {
                              var s = l[i]
                              swap.status = "0"
                              type = convertToIcon(swap)
                              s.setAttribute("src", type)
                            }
                          }
                        }
                      })
                    }
                };

                // If not an all day event, get the time nodes
                if ((moment.unix(entry.start_time).startOf('day').unix() === moment.unix(entry.start_time).unix()) &&
                    (moment.unix(entry.end_time).endOf('day').unix() === moment.unix(entry.end_time).unix()))
                {
                  // Manipulate all day here...
                }
                else
                {
                  var endtime_text
                  var starttime_text
                  if (moment.unix(entry.start_time).startOf('day').unix() === moment.unix(entry.start_time).unix())
                  {
                    starttime_text = document.createElement("IMG");
                    starttime_text.setAttribute('class', "calendar_icons")
                    starttime_text.setAttribute("src", weatherSunset)
                  }
                  else
                  {
                    starttime_text = document.createTextNode(moment.unix(entry.start_time).format('h:mma'))
                  }

                  // This check ensures the last day in a multi day event does not get a start time
                  if (moment.unix(entry.start_time).startOf('day').unix() !== moment.unix(entry.start_date).startOf('day').unix())
                  {
                    starttime_text = null
                  }

                  if (moment.unix(entry.end_time).endOf('day').unix() === moment.unix(entry.end_time).unix())
                  {
                    endtime_text = document.createElement("IMG");
                    endtime_text.setAttribute('class', "calendar_icons")
                    endtime_text.setAttribute("src", weatherNight)
                  }
                  else
                  {
                    endtime_text = document.createTextNode(moment.unix(entry.end_time).format('h:mma'))
                  }
                }

                // Entry text
                var textcontainer = document.createElement("div");
                var textnode = document.createTextNode(entry.title)
                textcontainer.setAttribute('class', "entry_text")
                if (entry.type !== 'habit')
                {
                  textcontainer.onclick = function()
                  {
                    store.dispatch(getEntriesModalID({
                      entries_modal_id: entry.entry_id
                    }))

                    axios.post('http://127.0.0.1:5002/api/return_one', {
                      params: {
                        user: sessionStorage.getItem('user'),
                        entry_id: entry.entry_id
                      }
                    })
                    .then((response) => {

                      store.dispatch(getCurrentEntry({
                        current_entry: response.data.entry
                      }))

                      store.dispatch(getEditEntriesModalState({
                        edit_entries_modal_status: true
                      }))
                    })
                  }
                }


                textcontainer.append(textnode)

                // Entry time
                var timetextcontainer = document.createElement("div");
                timetextcontainer.setAttribute('class', "entry_time")
                timetextcontainer.append(starttime_text)

                // Putting it all together
                var temp = document.getElementById(key)
                var node = document.createElement("div");
                if (starttime_text)
                {
                  node.append(svg,timetextcontainer,textcontainer)
                }
                else
                {
                  node.append(svg,textcontainer)
                }

                node.className = "calendar_text"
                temp.appendChild(node);

                var footer = document.getElementById("footer"+String(key))
                if (footer.children.length === 0)
                {
                  let timestamp = moment.unix(entry.start_time).format('dddd, MMMM Do, YYYY')

                  var div = document.createElement("div");
                  div.setAttribute('class', "list_footer")
                  var dots = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                  dots.setAttribute('class', "footer_icon")
                  dots.setAttributeNS(null, "viewBox", "0 0 24 24")
                  dots.setAttributeNS(null, "style", "width:1rem")
                  var np = document.createElementNS('http://www.w3.org/2000/svg',"path");
                  np.setAttributeNS(null, "d", mdiDotsHorizontal);

                  dots.onclick = function() {
                    store.dispatch(getEntriesModalID({
                      entries_modal_id: timestamp
                    }))
                    store.dispatch(getEntriesModalState({
                      entries_modal_status: true
                    }))
                  };

                  dots.appendChild(np)
                  div.appendChild(dots)
                  footer.appendChild(div);
                }
              }
            }
          })
        }
    })
}