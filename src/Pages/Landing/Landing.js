import React from 'react'
import lifecycle from 'react-pure-lifecycle';
import ReactSVG from 'react-svg'

// css
import './Landing.css'

// Components
import LandingNavBar from '../.././Components/NavBar/LandingNavBar'

// Images
var daisy = require('../.././Images/landing.svg')

class Landing extends React.Component {
  render() {
    return (
          <div>
            <LandingNavBar/>
            <ReactSVG id="landing_background" src={daisy}/>
          </div>
        )}
}

export default (Landing)
