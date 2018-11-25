import React from 'react'
import lifecycle from 'react-pure-lifecycle';
import ReactSVG from 'react-svg'

// css
import './Login.css'

// Components
import LandingNavBar from '../.././Components/NavBar/LandingNavBar'
import LogInPrompt from '../.././Components/LogInPrompt/LogInPrompt'

// Images
var prompt_back = require('../.././Images/prompt.svg')

class LogIn extends React.Component {
  render() {
    return (
  <div>
    <LandingNavBar />
    <LogInPrompt />
    <img id="prompt_background" alt="" style ={ { backgroundImage: "url("+prompt_back+")" } }/>
  </div>
)}
}

export default (LogIn);
