import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Pages
import Landing from './Pages/Landing/Landing'
import SignUp from './Pages/SignUp/SignUp'
import LogIn from './Pages/LogIn/LogIn'
import Journal from './Pages/Journal/Journal'
import Habits from './Pages/Habits/Habits'
import Calendar from './Pages/Calendar/Calendar'
import About from './Pages/About/About'
import Reset from './Pages/Reset/Reset'
import NotFound from './Pages/NotFound/NotFound'
import NewPassword from './Pages/NewPassword/NewPassword'

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

const _Habits = () => (
  <div>
    <Habits />
  </div>
)

const _About = () => (
  <div>
    <About />
  </div>
)

const _NotFound = () => (
  <div>
    <NotFound />
  </div>
)

const _Reset = () => (
  <div>
    <Reset />
  </div>
)

const _NewPassword = () => (
  <div>
    <NewPassword />
  </div>
)

const styles = theme => ({
});

class App extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={_Landing}/>
          <Route path="/signin" exact component={_LogIn}/>
          <Route path="/join" exact component={_SignUp}/>
          <Route path="/reset" exact component={_Reset}/>
          <Route path="/resetpassword" component={_NewPassword}/>
          <Route path="/journal" exact component={_Journal}/>
          <Route path="/habits" exact component={_Habits}/>
          <Route path="/calendar" exact component={_Calendar}/>
          <Route path="/about" exact component={_About}/>
          <Route component={_NotFound}/>
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
