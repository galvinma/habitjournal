import axios from 'axios';
import moment from 'moment'

// functions
import { toggleIcon } from './toggleicon'
import { convertToIcon } from './convertoicon'

// redux
import store from '.././Store/store'
import { connect } from "react-redux";
import { getLoadingStatus, getStoreCalendarEntries, getEntriesModalState, getEntriesModalID, getEditEntriesModalState, getCurrentEntry } from '.././Actions/actions'

// Icons
var weatherNight = require('.././Images/Icons/weather-night.svg')
var weatherSunset = require('.././Images/Icons/weather-sunset.svg')
var plus = require('.././Images/Icons/dots-horizontal.svg')



export function getCalendarEntries()
{
    this.toggleIcon = toggleIcon.bind(this)
    this.convertToIcon = convertToIcon.bind(this)

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

    var _this = this

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
                var type = this.convertToIcon(entry)
                var svg = document.createElement("IMG");
                svg.setAttribute('class', String(entry.entry_id))
                svg.className += " calendar_icons"
                svg.setAttribute("src", type)

                var _entry_id = entry.entry_id

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
                  textcontainer.onclick = () =>
                  {
                    store.dispatch(getEntriesModalID({
                      entries_modal_id: entry.entry_id
                    }))

                    axios.post(`${process.env.REACT_APP_DAISY_JOURNAL_API_URI}/api/return_one`, {
                      params: {
                        user: localStorage.getItem('user'),
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
                node.setAttribute('key', entry.entry_id+entry.type+entry.status+entry.title)
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

                // Toggle icon
                svg.onclick = () => {
                    if (entry.type !== 'habit')
                    {
                      this.toggleIcon(entry.entry_id, entry.type, entry.status)
                    }
                };

                var footer = document.getElementById("footer"+String(key))
                if (footer.children.length === 0)
                {
                  let timestamp = moment.unix(entry.start_time).format('dddd, MMMM Do, YYYY')

                  var dots = document.createElement("IMG");
                  dots.setAttribute('class', "footer_icon")
                  dots.setAttribute("src", plus)

                  dots.onclick = () => {
                    store.dispatch(getEntriesModalID({
                      entries_modal_id: timestamp
                    }))
                    store.dispatch(getEntriesModalState({
                      entries_modal_status: true
                    }))
                  };

                  footer.appendChild(dots)
                }
              }
            }
          })
        }
    })

    store.dispatch(getLoadingStatus({
      loading_status: false,
    }))

    console.log("getcalentries")

}
