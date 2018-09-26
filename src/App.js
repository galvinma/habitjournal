import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Typography
import 'typeface-roboto'

// Pages
import Landing from './Pages/Landing/Landing'
import SignUp from './Pages/SignUp/SignUp'
import LogIn from './Pages/LogIn/LogIn'
import Calendar from './Pages/Calendar/Calendar'
import CountdownTimer from './Pages/CountdownTimer/CountdownTimer'
import Journal from './Pages/Journal/Journal'

// Components
// import NavBar from './Components/NavBar/NavBar'

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


class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={_Landing}/>
        <Route path="/login" exact component={_LogIn}/>
        <Route path="/signup" exact component={_SignUp}/>
        <Route path="/timer" component={_CountdownTimer} />
        <Route path="/journal" component={_Journal}/>
        <Route path="/calendar" component={_Calendar}/>
      </div>
    );
  }
}

export default App;
