import React from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Icon from '@mdi/react'
import {  mdiSquare,
          mdiSquareOutline,
          mdiCircle,
          mdiCircleOutline,
          mdiTriangle,
          mdiTriangleOutline,
          mdiMinus,
          mdiClose,
          mdiFlowerOutline,
        } from '@mdi/js'

// Components
import InternalNavBar from '../.././Components/NavBar/InternalNavBar'
import Navs from '../.././Components/Calendar/Navs.js'
import CalendarHeader from '../.././Components/Calendar/CalendarHeader.js'
import CalendarBody from '../.././Components/Calendar/CalendarBody.js'

// functions
import { checkAuth } from '../.././Utils/checkauth'
import { convertToIcon } from '../.././Utils/convertoicon'
import { toggleIcon } from '../.././Utils/toggleicon'

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";

// CSS
import './Calendar.css'

const styles = theme => ({
  root: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '70px',
  },
  typo_width: {
    width: '12.8vw',
  },
  calendar_list: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    height: '12.5vh',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    listStyle: 'none',
    paddingTop: '0px',
    paddingBottom: '0px',
    paddingLeft: '2px',
    paddingRight: '2px',
    margin: '0',
  },
  calendar_header_names: {
    flexGrow: 1,
    textAlign: 'left',
    width: '12.8vw',
    maxWidth: '12.8vw',
    height: '5vh',
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
      selectedMonth: moment().month(),
      firstDayOfMonthDate: moment().startOf('month').format('YYYY-MM-DD'),
      displayMonthYear: moment().format('MMMM YYYY'),
      daysInMonth: moment().daysInMonth(),
    };

    this.prevMonthHandler = this.prevMonthHandler.bind(this)
    this.nextMonthHandler = this.nextMonthHandler.bind(this)
    this.updateCalendarBody = this.updateCalendarBody.bind(this)
    this.removeOldEntries = this.removeOldEntries.bind(this)
    this.getCalendarEntries = this.getCalendarEntries.bind(this)
  }

  componentDidMount() {
    this.getCalendarEntries()
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
              <Typography component="div" variant="body1" className={this.props.classes.typo_width}>
                <div>{count}</div>
                <div className={this.props.classes.calendar_list} id={date_to_compare}></div>
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
      res.forEach(entry => {

        if (entry.type !== 'note')
        {
          let timestamp = moment.unix(entry.date).format('dddd, MMMM Do, YYYY')
          if (document.getElementById(String(timestamp)))
          {
            // Insert the SVG
            var temp = document.getElementById(timestamp)

            if (temp.childNodes.length < 2)
            {
              let node = document.createElement("div");
              var type = convertToIcon(entry)
              var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
              svg.setAttribute('class', "calendar_icons")
              svg.setAttributeNS(null, "viewBox", "0 0 24 24")
              svg.setAttributeNS(null, "style", "width:1rem")
              let newpath = document.createElementNS('http://www.w3.org/2000/svg',"path");
              newpath.setAttributeNS(null, "d", type);

              svg.onclick = function() {
                  toggleIcon(entry.entry_id, entry.type, entry.status)
                  if (entry.status === "0")
                  {
                    entry.status = "1"
                    type = convertToIcon(entry)
                    newpath.setAttributeNS(null, "d", type);
                  }
                  else
                  {
                    entry.status = "0"
                    type = convertToIcon(entry)
                    newpath.setAttributeNS(null, "d", type);
                  }
              };

              svg.appendChild(newpath)
              node.appendChild(svg)

              // Insert the bullet/habit text
              let textnode = document.createTextNode(entry.title)
              node.appendChild(textnode)

              node.className = "calendar_text"
              temp.appendChild(node);
            }
            else if (temp.childNodes.length === 2)
            {
              // Insert the bullet/habit text
              let node = document.createElement("div");
              let textnode = document.createTextNode("More...")
              node.appendChild(textnode)
              temp.appendChild(node);
            }
          }
        }
      })
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
          <Navs
              prevMonthHandler = {this.prevMonthHandler}
              nextMonthHandler = {this.nextMonthHandler}
              displayMonthYear={this.state.displayMonthYear}
              />
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
