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
        } from '@mdi/js'

// Components
import InternalNavBar from '../.././Components/NavBar/InternalNavBar'
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
    // overflowY: 'scroll',
    textOverflow: 'ellipsis',
    listStyle: 'none',
    padding: '0',
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
    this.updateCalendarHeader = this.updateCalendarHeader.bind(this)
    this.removeOldBullets = this.removeOldBullets.bind(this)
    this.getCalendarHabits = this.getCalendarHabits.bind(this)
    this.getCalendarBullets = this.getCalendarBullets.bind(this)

    this.getCalendarBullets()
    this.getCalendarHabits()
  }

  prevMonthHandler() {

    this.removeOldBullets()

    this.setState({
      selectedMonth: this.state.selectedMonth - 1,
      firstDayOfMonthDate: moment(this.state.firstDayOfMonthDate).subtract(1, 'months').format('YYYY-MM-DD'),
      displayMonthYear: moment(this.state.firstDayOfMonthDate).subtract(1, 'months').format('MMMM YYYY'),
      daysInMonth: moment(this.state.firstDayOfMonthDate).subtract(1, 'months').daysInMonth(),
    })

    this.updateCalendarBody()
    this.getCalendarBullets()
    this.getCalendarHabits()
  }

  nextMonthHandler() {

    this.removeOldBullets()

    this.setState({
      selectedMonth: this.state.selectedMonth + 1,
      firstDayOfMonthDate: moment(this.state.firstDayOfMonthDate).add(1, 'months').format('YYYY-MM-DD'),
      displayMonthYear: moment(this.state.firstDayOfMonthDate).add(1, 'months').format('MMMM YYYY'),
      daysInMonth: moment(this.state.firstDayOfMonthDate).add(1, 'months').daysInMonth(),
    })

    this.updateCalendarBody()
    this.getCalendarBullets()
    this.getCalendarHabits()
  }

  updateCalendarHeader()
  {
    const day_names = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const col_headers = []
    var day_name_count = 0;
    while (day_name_count < 7) {
        col_headers.push(
          <div key={day_names[day_name_count]} className={this.props.classes.calendar_header_names}>
            <Typography variant="body1" className={this.props.classes.typo_width}>
              {day_names[day_name_count]}
            </Typography>
          </div>
        );
      day_name_count++
    }
    return col_headers
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

  getCalendarBullets()
  {
    axios.post('http://127.0.0.1:5002/api/return_bullets', {
      params: {
        user: sessionStorage.getItem('user'),
      }
    })
    .then((response) => {
      var res = response.data.bullets
      res.forEach(bullet => {

        let timestamp = moment.unix(bullet.date).format('dddd, MMMM Do, YYYY')
        if (document.getElementById(String(timestamp)))
        {
          // Insert the SVG
          let temp = document.getElementById(timestamp)
          let node = document.createElement("div");
          var type = convertToIcon(bullet)
          var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          svg.setAttribute('class', "calendar_icons")
          svg.setAttributeNS(null, "viewBox", "0 0 24 24")
          svg.setAttributeNS(null, "style", "width:1rem")
          let newpath = document.createElementNS('http://www.w3.org/2000/svg',"path");
          newpath.setAttributeNS(null, "d", type);

          svg.onclick = function() {
              toggleIcon(bullet.bullet_id, bullet.type, bullet.status)
              if (bullet.status === "0")
              {
                bullet.status = "1"
                type = convertToIcon(bullet)
                newpath.setAttributeNS(null, "d", type);
              }
              else
              {
                bullet.status = "0"
                type = convertToIcon(bullet)
                newpath.setAttributeNS(null, "d", type);
              }
          };

          svg.appendChild(newpath)
          node.appendChild(svg)

          // Insert the bullet/habit text
          let textnode = document.createTextNode(bullet.description)
          node.appendChild(textnode)

          temp.appendChild(node);

        }
      })
    })
  }

  getCalendarHabits()
  {
    axios.post('http://127.0.0.1:5002/api/return_habit_entries', {
      params: {
        user: sessionStorage.getItem('user'),
      }
    })
    .then((response) => {
      var res = response.data.habit_entries
      res.forEach(entry => {
          if (entry.status === '1')
          {
            let timestamp = moment.unix(entry.date).format('dddd, MMMM Do, YYYY')
            if (document.getElementById(String(timestamp)))
            {
              let temp = document.getElementById(timestamp)
              let node = document.createElement("div");
              let textnode = document.createTextNode(entry.name)
              node.appendChild(textnode)
              temp.appendChild(node);
            }
          }
        })
      })
  }

  removeOldBullets()
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
          <CalendarHeader
              prevMonthHandler = {this.prevMonthHandler}
              nextMonthHandler = {this.nextMonthHandler}
              displayMonthYear={this.state.displayMonthYear}
              />
          <CalendarBody
              daysInMonth={this.state.daysInMonth}
              selectedMonth={this.state.selectedMonth}
              firstDayOfMonthDate={this.state.firstDayOfMonthDate}
              getCalendarBullets={this.getCalendarBullets}
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
