import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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
  },
  calendar_day_names: {
    display: 'inline-block',
    flexGrow: 1,
    textAlign: 'center',
    width: '10vw',
    maxWidth: '10vw',
    height: '5vh',
  }

});

class CalendarBody extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {
    console.log(moment(this.props.firstDayOfMonthDate).day())
  }

  render() {
    const day_names = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const col_headers = []
    var day_name_count = 0;
    while (day_name_count < 7) {
        col_headers.push(
          <div className={this.props.classes.calendar_day_names}>
            {day_names[day_name_count]}
          </div>
        );
      day_name_count++
    }

    const row_offset = moment(this.props.firstDayOfMonthDate).day();
    var offset_count = 1;
    const row = [];
    var count = 1;
    var daysInMonth = this.props.daysInMonth;
    var selectedMonth = this.props.selectedMonth;
    while (offset_count <= row_offset) {
      row.push(
        <div className={this.props.classes.calendar_cell}>
        </div>
      );
      offset_count++
    }

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
        <div className={this.props.classes.calendar_row_container}>{col_headers}</div>
        <div className={this.props.classes.calendar_row_container}>{row}</div>
      </div>
    );
  }
}

CalendarBody.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(CalendarBody);
