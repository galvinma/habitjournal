import React from 'react'
import lifecycle from 'react-pure-lifecycle';
import ReactSVG from 'react-svg'

// css
import './SignUp.css'

// Components
import LandingNavBar from '../.././Components/NavBar/LandingNavBar'
import SignUpPrompt from '../.././Components/SignUpPrompt/SignUpPrompt'

// Images
var daisy = require('../.././Images/landing.svg')

class SignUp extends React.Component {
  render() {
    return (
  <div>
    <LandingNavBar />
    <SignUpPrompt />
    <ReactSVG id="landing_background" src={daisy}/>
  </div>
)}
}

export default (SignUp);
