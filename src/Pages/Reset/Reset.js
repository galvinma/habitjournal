import React from 'react'
import lifecycle from 'react-pure-lifecycle';
import ReactSVG from 'react-svg'

// css
import './Reset.css'

// Components
import LandingNavBar from '../.././Components/NavBar/LandingNavBar'
import ResetPrompt from '../.././Components/LogInPrompt/ResetPrompt'

// Images
var daisy = require('../.././Images/landing.svg')

const methods = {

};

const Reset = (props) => (
  <div>
    <LandingNavBar />
    <ResetPrompt />
    <ReactSVG id="landing_background" src={daisy}/>
  </div>
)

export default lifecycle(methods)(Reset);
