import React from 'react'
import axios from 'axios';
import moment from 'moment'
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
  constructor(props)
  {
    super(props);
    this.state = {

    };
  }

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
        <div className={this.props.classes.calendar_row_container}>{row}</div>
      </div>
    );
  }
}

CalendarBody.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(CalendarBody);
