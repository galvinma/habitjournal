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
import Description from './Pages/Description/Description'

// css
import './App.css';

// Images and Icons
var dots = require('./Images/Icons/dots-horizontal.svg')
var minus = require('./Images/Icons/minus.svg')
var plus = require('./Images/Icons/plus.svg')
var weatherNight = require('./Images/Icons/weather-night.svg')
var weatherSunset = require('./Images/Icons/weather-sunset.svg')
var checkboxBlankCircleOutline = require('./Images/Icons/checkbox-blank-circle-outline.svg')
var checkboxBlankCircle = require('./Images/Icons/checkbox-blank-circle.svg')
var checkboxBlankOutline = require('./Images/Icons/checkbox-blank-outline.svg')
var checkboxBlankTriangleOutline = require('./Images/Icons/checkbox-blank-triangle-outline.svg')
var checkboxBlankTriangle = require('./Images/Icons/checkbox-blank-triangle.svg')
var checkboxBlank = require('./Images/Icons/checkbox-blank.svg')
var checkboxMultipleBlankCircleOutline = require('./Images/Icons/checkbox-multiple-blank-circle-outline.svg')
var checkboxMultipleBlankCircle = require('./Images/Icons/checkbox-multiple-blank-circle.svg')
var checkboxMultipleBlankOutline = require('./Images/Icons/checkbox-multiple-blank-outline.svg')
var checkboxMultipleBlankTriangleOutline = require('./Images/Icons/checkbox-multiple-blank-triangle-outline.svg')
var checkboxMultipleBlankTriangle = require('./Images/Icons/checkbox-multiple-blank-triangle.svg')
var checkboxMultipleBlank = require('./Images/Icons/checkbox-multiple-blank.svg')
var flowerOutline = require('./Images/Icons/flower-outline.svg')
var flower = require('./Images/Icons/flower.svg')
var key = require('./Images/Icons/key.svg')
var archive = require('./Images/Icons/archive.svg')
var logo = require('./Images/logo.svg')
var close = require('./Images/Icons/close.svg')

var icons = {
  "minus": minus,
  "plus": plus,
  "dots": dots,
  "weatherSunset": weatherSunset,
  "weatherNight": weatherNight,
  "key": key,
  "archive": archive,
  "checkboxBlankCircleOutline": checkboxBlankCircleOutline,
  "checkboxBlankCircle": checkboxBlankCircle,
  "checkboxBlankOutline": checkboxBlankOutline,
  "checkboxBlankTriangleOutline": checkboxBlankTriangleOutline,
  "checkboxBlankTriangle": checkboxBlankTriangle,
  "checkboxBlank": checkboxBlank,
  "checkboxMultipleBlankCircleOutline": checkboxMultipleBlankCircleOutline,
  "checkboxMultipleBlankCircle": checkboxMultipleBlankCircle,
  "checkboxMultipleBlankOutline": checkboxMultipleBlankOutline,
  "checkboxMultipleBlankTriangleOutline": checkboxMultipleBlankTriangleOutline,
  "checkboxMultipleBlankTriangle": checkboxMultipleBlankTriangle,
  "checkboxMultipleBlank": checkboxMultipleBlank,
  "flowerOutline": flowerOutline,
  "flower": flower,
  "logo": logo,
  "close": close,
}

const _Landing = () => (
  <div>
    <Landing icons={icons}/>
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

const _Description = () => (
  <div>
    <Description />
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
          <Route path="/info" component={_Description} />
          <Route path="/journal" exact component={_Journal}/>
          <Route path="/habits" exact component={_Habits}/>
          <Route path="/calendar" exact component={_Calendar}/>
          <Route path="/about" exact component={_About}/>
          <Route component={_NotFound} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
