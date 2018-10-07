import React from 'react'
import { Redirect } from 'react-router-dom';
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
  paper: {
    marginLeft: '15vw',
    marginRight: '15vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
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
  }

  prevMonthHandler() {
    this.setState({
      selectedMonth: this.state.selectedMonth - 1,
      firstDayOfMonthDate: moment(this.state.firstDayOfMonthDate).subtract(1, 'months').format('YYYY-MM-DD'),
      displayMonthYear: moment(this.state.firstDayOfMonthDate).subtract(1, 'months').format('MMMM YYYY'),
      daysInMonth: moment(this.state.firstDayOfMonthDate).subtract(1, 'months').daysInMonth(),
    })
  }

  nextMonthHandler() {
    this.setState({
      selectedMonth: this.state.selectedMonth + 1,
      firstDayOfMonthDate: moment(this.state.firstDayOfMonthDate).add(1, 'months').format('YYYY-MM-DD'),
      displayMonthYear: moment(this.state.firstDayOfMonthDate).add(1, 'months').format('MMMM YYYY'),
      daysInMonth: moment(this.state.firstDayOfMonthDate).add(1, 'months').daysInMonth(),
    })
  }

  render() {
    if (store.getState().auth_status.auth_status === false) {
      return <Redirect to='/' />
    }  
    return(
      <div>
        <InternalNavBar />
        <Paper className={this.props.classes.paper}>
          <CalendarHeader
              prevMonthHandler = {this.prevMonthHandler}
              nextMonthHandler = {this.nextMonthHandler}
              displayMonthYear={this.state.displayMonthYear}
              />
          <CalendarBody
              daysInMonth={this.state.daysInMonth}
              selectedMonth={this.state.selectedMonth}
              firstDayOfMonthDate={this.state.firstDayOfMonthDate}/>
        </Paper>
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
