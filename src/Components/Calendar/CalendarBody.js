import React from 'react'
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  calendar_row_container: {
    width: '90vw',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  hidden: {
    visibility: "hidden",
  },
});

class CalendarBody extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
    };
  }

  render() {
    const row = this.props.updateCalendarBody()
    return(
      <div>
        <div id="calendar_content" className={this.props.classes.calendar_row_container}>{row}</div>
      </div>
    );
  }
}

CalendarBody.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(CalendarBody);
