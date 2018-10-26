import React from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// Components
import InternalNavBar from '../.././Components/NavBar/InternalNavBar'
import CalendarHeader from '../.././Components/Calendar/CalendarHeader.js'
import CalendarBody from '../.././Components/Calendar/CalendarBody.js'

// functions
import { checkAuth } from '../.././Utils/checkauth'

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  calendar_cell: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    width: '12.8vw',
    maxWidth: '12.8vw',
    height: '12.5vh',
    wordWrap: 'break-word',
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  calendar_header_names: {
    display: 'inline-block',
    flexGrow: 1,
    textAlign: 'left',
    width: '12.8vw',
    maxWidth: '12.8vw',
    height: '5vh',
  }

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
          if (bullet.type === 'habit' && bullet.status === '1')
          {
            let timestamp = moment.unix(bullet.date).format('dddd, MMMM Do, YYYY')

            if (document.getElementById(String(timestamp)))
            {
              let temp = document.getElementById(timestamp)
              let node = document.createElement("LI");
              let textnode = document.createTextNode(bullet.description)
              node.appendChild(textnode)
              temp.appendChild(node);
            }
          }
      })
    })
  }

  updateCalendarHeader()
  {
    const day_names = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const col_headers = []
    var day_name_count = 0;
    while (day_name_count < 7) {
        col_headers.push(
          <div key={day_names[day_name_count]} className={this.props.classes.calendar_header_names}>
            {day_names[day_name_count]}
          </div>
        );
      day_name_count++
    }
    return col_headers
  }

  updateCalendarBody()
  {
    var row_offset = moment(this.state.firstDayOfMonthDate).day();
    var offset_count = 1;
    var row = [];
    var count = 1;
    var daysInMonth = this.state.daysInMonth;
    var selectedMonth = this.state.selectedMonth;
    while (offset_count <= row_offset) {
      row.push(
        <div key={this.state.selectedMonth+"offset"+offset_count} className={this.props.classes.calendar_cell}>
        </div>
      );
      offset_count++
    }

    while (count <= daysInMonth) {
      var date = String(moment().date(count).format('D'));
      var date_to_compare = String(moment().month(this.state.selectedMonth).date(count).format(`dddd, MMMM Do, YYYY`));
      row.push(
          <div key={"count"+date}>
            <div>{date}</div>
              <ul className={this.props.classes.calendar_cell} id={date_to_compare}></ul>
          </div>
      );
      count++
    }

    return row
  }

  removeOldBullets()
  {
    var count = 1;

    while (count <= this.state.daysInMonth) {
      var date = String(moment().date(count).format('D'));
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
