import React from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Icon from '@mdi/react'
import MediaQuery from 'react-responsive';
import {  mdiSquare,
          mdiSquareOutline,
          mdiCircle,
          mdiCircleOutline,
          mdiTriangle,
          mdiTriangleOutline,
          mdiMinus,
          mdiClose,
          mdiFlowerOutline,
          mdiDotsHorizontal,
        } from '@mdi/js'

// Components
import InternalNavBar from '../.././Components/NavBar/InternalNavBar'
import Navs from '../.././Components/Calendar/Navs'
import CalendarHeader from '../.././Components/Calendar/CalendarHeader'
import CalendarBody from '../.././Components/Calendar/CalendarBody'
import CalendarEntries from '../.././Components/Modal/CalendarEntries'

// functions
import { checkAuth } from '../.././Utils/checkauth'
import { convertToIcon } from '../.././Utils/convertoicon'
import { toggleIcon } from '../.././Utils/toggleicon'

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";
import { getEntriesModalState, getEntriesModalID } from '../.././Actions/actions'

// CSS
import './Calendar.css'

// Images and Icons
var minus = require('../.././Images/Icons/minus.svg')
var checkboxBlankCircleOutline = require('../.././Images/Icons/checkbox-blank-circle-outline.svg')
var checkboxBlankCircle = require('../.././Images/Icons/checkbox-blank-circle.svg')
var checkboxBlankOutline = require('../.././Images/Icons/checkbox-blank-outline.svg')
var checkboxBlankTriangleOutline = require('../.././Images/Icons/checkbox-blank-triangle-outline.svg')
var checkboxBlankTriangle = require('../.././Images/Icons/checkbox-blank-triangle.svg')
var checkboxBlank = require('../.././Images/Icons/checkbox-blank.svg')
var checkboxMultipleBlankCircleOutline = require('../.././Images/Icons/checkbox-multiple-blank-circle-outline.svg')
var checkboxMultipleBlankCircle = require('../.././Images/Icons/checkbox-multiple-blank-circle.svg')
var checkboxMultipleBlankOutline = require('../.././Images/Icons/checkbox-multiple-blank-outline.svg')
var checkboxMultipleBlankTriangleOutline = require('../.././Images/Icons/checkbox-multiple-blank-triangle-outline.svg')
var checkboxMultipleBlankTriangle = require('../.././Images/Icons/checkbox-multiple-blank-triangle.svg')
var checkboxMultipleBlank = require('../.././Images/Icons/checkbox-multiple-blank.svg')
var flowerOutline = require('../.././Images/Icons/flower-outline.svg')
var flower = require('../.././Images/Icons/flower.svg')
var weatherNight = require('../.././Images/Icons/weather-night.svg')
var weatherSunset = require('../.././Images/Icons/weather-sunset.svg')

const styles = theme => ({
  root: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '65px',
  },
  typo_width: {
    width: '12.8vw',
  },
  calendar_list: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    height: '10vh',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    listStyle: 'none',
    paddingTop: '0px',
    paddingBottom: '0px',
    marginTop: '0px',
    marginBottom: '0px',
    marginLeft: '2px',
    marginRight: '2px',
  },
  list_footer_container: {
    height: '1em',
    position: 'relative',
    height: '1em',
    clear: 'both',
    width: '100%',
    paddingBottom: '5px',
  },
  calendar_header_names: {
    flexGrow: 1,
    textAlign: 'left',
    width: '12.8vw',
    maxWidth: '12.8vw',
  },
  hidden: {
    visibility: "hidden",
  },

});

class Calendar extends React.Component {

  constructor(props)
  {
    super(props);

    checkAuth()

    this.state = {
      calendar_entries: {},
      selectedMonth: moment().month(),
      firstDayOfMonthDate: moment().startOf('month').format('YYYY-MM-DD'),
      displayMonthYear: moment().format('MMMM YYYY'),
      daysInMonth: moment().daysInMonth(),
      showEntriesModalState: false,
      edit_id: "",
      rand: 0
    };

    this.prevMonthHandler = this.prevMonthHandler.bind(this)
    this.nextMonthHandler = this.nextMonthHandler.bind(this)
    this.updateCalendarBody = this.updateCalendarBody.bind(this)
    this.removeOldEntries = this.removeOldEntries.bind(this)
    this.getCalendarEntries = this.getCalendarEntries.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.selectedMonth !== this.state.selectedMonth ||
        nextState.firstDayOfMonthDate !== this.state.firstDayOfMonthDate ||
        nextState.displayMonthYear !== this.state.displayMonthYear ||
        nextState.daysInMonth !== this.state.daysInMonth)
    {
      return true
    }
    else
    {
      return false
    }
  }

  componentDidMount() {
    this.getCalendarEntries()
  }

  handleModalClose()
  {
    store.dispatch(getEntriesModalState({
      entries_modal_status: false
    }))
  }

  prevMonthHandler() {

    this.removeOldEntries()

    this.setState({
      selectedMonth: this.state.selectedMonth - 1,
      firstDayOfMonthDate: moment(this.state.firstDayOfMonthDate).subtract(1, 'months').format('YYYY-MM-DD'),
      displayMonthYear: moment(this.state.firstDayOfMonthDate).subtract(1, 'months').format('MMMM YYYY'),
      daysInMonth: moment(this.state.firstDayOfMonthDate).subtract(1, 'months').daysInMonth(),
    })

    this.updateCalendarBody()
    this.getCalendarEntries()
  }

  nextMonthHandler() {

    this.removeOldEntries()

    this.setState({
      selectedMonth: this.state.selectedMonth + 1,
      firstDayOfMonthDate: moment(this.state.firstDayOfMonthDate).add(1, 'months').format('YYYY-MM-DD'),
      displayMonthYear: moment(this.state.firstDayOfMonthDate).add(1, 'months').format('MMMM YYYY'),
      daysInMonth: moment(this.state.firstDayOfMonthDate).add(1, 'months').daysInMonth(),
    })

    this.updateCalendarBody()
    this.getCalendarEntries()
  }

  updateCalendarBody()
  {
    var month = this.state.selectedMonth
    var daysInMonth = this.state.daysInMonth;
    var row_offset = moment(this.state.firstDayOfMonthDate).day();
    var offset_count = 1;
    var row = [];
    var count = 1;
    var daysInMonth = this.state.daysInMonth;
    while (offset_count <= row_offset) {
      var salt = Math.random()*1000
      row.push(
        <div key={count+month+daysInMonth+salt}>
            <Typography component="div" variant="body1" className={this.props.classes.typo_width}>
              <div className={this.props.classes.hidden}>{offset_count}</div>
              <div className={this.props.classes.calendar_list}></div>
          </Typography>
        </div>
      );
      offset_count++
    }

    while (count <= daysInMonth) {
      var salt = Math.random()*1000
      var date = String(moment().date(count).format('D'));
      var date_to_compare = String(moment().month(this.state.selectedMonth).date(count).format(`dddd, MMMM Do, YYYY`));
      row.push(
          <div key={count+date+month+daysInMonth+salt}>
              <Typography component="div" variant="body2" className={this.props.classes.typo_width}>
                <div class="count_style">{count}</div>
                <div className={this.props.classes.calendar_list} id={date_to_compare}></div>
                <div
                  className={this.props.classes.list_footer_container}
                  id={"footer"+date_to_compare}
                  value={date_to_compare}></div>
            </Typography>
          </div>
      );
      count++
    }

    return row
  }

  getCalendarEntries()
  {
    axios.post('http://127.0.0.1:5002/api/return_entries', {
      params: {
        user: sessionStorage.getItem('user'),
      }
    })
    .then((response) => {
      var res = response.data.entries

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
                if (!(new_calendar_entries[moment(ref_date).format('dddd, MMMM Do, YYYY')]))
                {
                  new_calendar_entries[moment(ref_date).format('dddd, MMMM Do, YYYY')] = []
                }

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
                    temp.start_time = moment.unix(ref_date).startOf('day').unix()
                    temp.end_time = moment.unix(ref_date).endOf('day').unix()
                  }
                }

                new_calendar_entries[moment(ref_date).format('dddd, MMMM Do, YYYY')].push(temp)
              }

              ref_date = moment(ref_date).add(1, 'days')
            }
          }
      })

      this.setState({
        calendar_entries: new_calendar_entries,
      })

      for (var key in new_calendar_entries)
      {
      new_calendar_entries[key].forEach(entry => {
        if (entry.type === 'task' ||
            entry.type === 'event' ||
            entry.type === 'appointment' ||
            (entry.type === 'habit' && entry.status === '1'))
        {
          let timestamp = moment.unix(entry.start_date).format('dddd, MMMM Do, YYYY')
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

            // node.appendChild(textnode)
            node.className = "calendar_text"
            temp.appendChild(node);

            var footer = document.getElementById("footer"+String(key))
            if (footer.children.length === 0)
            {

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
                  entries_modal_id: String(timestamp)
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

  removeOldEntries()
  {
    var count = 1;

    while (count <= this.state.daysInMonth) {
      var date_to_compare = String(moment().month(this.state.selectedMonth).date(count).format(`dddd, MMMM Do, YYYY`));
      var node = document.getElementById(date_to_compare)
      node.innerHTML = ""
      count++
    }
  }

  render() {
    if (store.getState().auth_status.auth_status === false) {
      return <Redirect to='/' />
    }

    return(
      <div>
        <InternalNavBar />
        <div className={this.props.classes.root}>
          <CalendarEntries
              handleModalOpen={this.handleModalOpen}
              handleModalClose={this.handleModalClose}
              edit_id={this.state.edit_id} />
          <Navs
              prevMonthHandler = {this.prevMonthHandler}
              nextMonthHandler = {this.nextMonthHandler}
              displayMonthYear={this.state.displayMonthYear} />
          <CalendarHeader
              daysInMonth={this.state.daysInMonth}
              selectedMonth={this.state.selectedMonth}
              firstDayOfMonthDate={this.state.firstDayOfMonthDate}
              getCalendarEntries={this.getCalendarEntries}
              updateCalendarHeader={this.updateCalendarHeader}
              updateCalendarBody={this.updateCalendarBody} />
          <CalendarBody
              daysInMonth={this.state.daysInMonth}
              selectedMonth={this.state.selectedMonth}
              firstDayOfMonthDate={this.state.firstDayOfMonthDate}
              getCalendarEntries={this.getCalendarEntries}
              updateCalendarHeader={this.updateCalendarHeader}
              updateCalendarBody={this.updateCalendarBody} />
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth_status: state.auth_status,
    current_user: state.current_user
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Calendar));
