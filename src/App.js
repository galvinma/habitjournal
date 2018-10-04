import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// Pages
import Landing from './Pages/Landing/Landing'
import SignUp from './Pages/SignUp/SignUp'
import LogIn from './Pages/LogIn/LogIn'
import Calendar from './Pages/Calendar/Calendar'
import CountdownTimer from './Pages/CountdownTimer/CountdownTimer'
import Journal from './Pages/Journal/Journal'

// Images and Animations
import Lighthouse from './Images/Artboard.svg'

// css
import './App.css';

const _Landing = () => (
  <div>
    <Landing />
  </div>
)

const _SignUp = () => (
  <div>
    <SignUp />
  </div>
)

const _LogIn = () => (
  <div>
    <LogIn />
  </div>
)

const _CountdownTimer = () => (
  <div>
    <CountdownTimer />
  </div>
)

const _Journal = () => (
  <div>
    <Journal />
  </div>
)

const _Calendar = () => (
  <div>
    <Calendar />
  </div>
)


const styles = theme => ({
  lighthouse: {
    backgroundImage: `url(${Lighthouse})`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left bottom',
    position: 'fixed',
    height: '100%',
    width: '100%',
  },

});

class App extends Component {

  render() {
    return (
      <div>
        <Paper className={this.props.classes.lighthouse}>

        <Route path="/" exact component={_Landing}/>
        <Route path="/login" exact component={_LogIn}/>
        <Route path="/signup" exact component={_SignUp}/>
        <Route path="/timer" component={_CountdownTimer} />
        <Route path="/journal" component={_Journal}/>
        <Route path="/calendar" component={_Calendar}/>
        </Paper>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
