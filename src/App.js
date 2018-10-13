import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// Pages
import Landing from './Pages/Landing/Landing'
import SignUp from './Pages/SignUp/SignUp'
import LogIn from './Pages/LogIn/LogIn'
import Journal from './Pages/Journal/Journal'

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


const styles = theme => ({

});

class App extends Component {

  render() {
    return (
      <div>
          <Route path="/" exact component={_Landing}/>
          <Route path="/login" exact component={_LogIn}/>
          <Route path="/signup" exact component={_SignUp}/>
          <Route path="/journal" component={_Journal}/>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
