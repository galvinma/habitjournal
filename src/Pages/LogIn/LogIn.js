import React from 'react'
import lifecycle from 'react-pure-lifecycle';
import ReactSVG from 'react-svg'

// css
import './Login.css'

// Components
import LandingNavBar from '../.././Components/NavBar/LandingNavBar'
import LogInPrompt from '../.././Components/LogInPrompt/LogInPrompt'

// Images
var daisy = require('../.././Images/landing.svg')

class LogIn extends React.Component {
  render() {
    return (
  <div>
    <LandingNavBar />
    <LogInPrompt />
    <ReactSVG id="landing_background" src={daisy}/>
  </div>
)}
}

export default (LogIn);
