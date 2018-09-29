import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Components
import CalendarCell from './CalendarCell'

const styles = theme => ({
  calendar_cell: {
    display: 'inline-block',
    flexGrow: 1,
    textAlign: 'center',
    width: '10vw',
    maxWidth: '10vw',
    height: '15vh',
  },
  calendar_row_container: {
    width: '70vw',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  }
});

class CalendarBody extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {

    };
  }

  render() {
    const row = [];
    var count = 1;
    var daysInMonth = this.props.daysInMonth;
    var selectedMonth = this.props.selectedMonth;
    while (count <= daysInMonth) {
      var date = String(moment().date(count).format('D'));
      row.push(
        <div className={this.props.classes.calendar_cell}>
          {date}
        </div>
      );
      count++
    }

    return(
      <div>
        <div className={this.props.classes.calendar_row_container}>{row}</div>
      </div>
    );
  }
}

CalendarBody.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(CalendarBody);
