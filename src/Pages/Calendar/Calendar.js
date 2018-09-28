import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// Components
import InternalNavBar from '../.././Components/NavBar/InternalNavBar'
import CalendarHeader from '../.././Components/Calendar/CalendarHeader.js'
import CalendarCell from '../.././Components/Calendar/CalendarCell.js'

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
});

class Calendar extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      getMonth: moment().format(),
    };
  }


  render() {
    return(
      <div>
        <InternalNavBar />
        <Paper className={this.props.classes.paper}>
          <CalendarHeader />
        </Paper>  
      </div>
    );
  }
}

Calendar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Calendar);
