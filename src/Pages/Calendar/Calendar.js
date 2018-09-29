import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// Components
import InternalNavBar from '../.././Components/NavBar/InternalNavBar'
import CalendarHeader from '../.././Components/Calendar/CalendarHeader.js'
import CalendarBody from '../.././Components/Calendar/CalendarBody.js'

const styles = theme => ({
  paper: {
    leftMargin: '15vw',
    rightMargin: '15vw',
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
    this.state = {
      today: moment().calendar(),
      selectedDate: moment().format(),
      selectedMonth: moment().month(),
      getMonth: moment().format('MMMM YYYY'),
      daysInMonth: moment().daysInMonth(),
    };
  }


  render() {
    return(
      <div>
        <InternalNavBar />
        <Paper className={this.props.classes.paper}>
          <CalendarHeader
              getMonth={this.state.getMonth}
              />
          <CalendarBody
              daysInMonth={this.state.daysInMonth}
              selectedMonth={this.state.selectedMonth}/>
        </Paper>
      </div>
    );
  }
}

Calendar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Calendar);
