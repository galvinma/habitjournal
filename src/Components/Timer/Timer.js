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
    timeLeft: '1500',
    }
    this.beginCountDown = this.beginCountDown.bind(this)
    this.resetCountDown = this.countDown.bind(this)
    this.countDown = this.countDown.bind(this)

  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  beginCountDown() {
    // start timer
    this.timer = setInterval(this.countDown, 1000);
  }

  resetCountDown() {
    clearInterval(this.timer);
  }

  countDown() {
    var min = Math.floor(this.state.timeLeft / 60);
    var sec = this.state.timeLeft - (min * 60);

    this.setState({
      minutes: min,
      seconds: sec,
    })

    if (sec < 10) {
      this.setState({
        seconds: '0' + sec
      })
    }

    if (min < 10) {
      this.setState({
        minutes: '0' + min
       })
    }

    if (sec <= 0 && min <= 0)
    {
      this.playAudio();
      clearInterval(this.timer);
    }

    // decrement
    this.setState({
      timeLeft: this.state.timeLeft-1
    })

  }

  playAudio() {
    console.log("Playing audio")
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
              <Button type="submit" variant="raised" color="primary" onClick={this.beginCountDown}>Start</Button>
              <Button type="submit" variant="raised" color="primary">Pause</Button>
              <Button type="submit" variant="raised" color="primary"
              onClick={this.resetCountDown}>Reset</Button>
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
