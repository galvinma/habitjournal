import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  calendar_row_container: {
    width: '90vw',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

});

class CalendarBody extends React.Component {
  componentDidMount()
  {
    this.props.getCalendarBullets()
  }

  render() {
    const col_headers = this.props.updateCalendarHeader()
    const row = this.props.updateCalendarBody()
    return(
      <div>
        <div className={this.props.classes.calendar_row_container}>{col_headers}</div>
        <div id="calendar_content" className={this.props.classes.calendar_row_container}>{row}</div>
      </div>
    );
  }
}

CalendarBody.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(CalendarBody);
