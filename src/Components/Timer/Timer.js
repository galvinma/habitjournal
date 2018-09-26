import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  timedisplay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '4em',
  },
});


class Timer extends React.Component {
  constructor(props){
  super(props);
   this.state = {
    seconds: '00',
    minutes: '25',
    }
  }
  render() {
    return (
      <div>
        <div className={this.props.classes.layout}>
          <Paper className={this.props.classes.paper}>
            <h1 className={this.props.classes.timedisplay}>
              {this.state.minutes}:{this.state.seconds}
            </h1>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <Button type="submit" variant="raised" color="primary">Start</Button>
              <Button type="submit" variant="raised" color="primary">Pause</Button>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Timer);
