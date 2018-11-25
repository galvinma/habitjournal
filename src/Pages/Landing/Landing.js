import React from 'react'
import lifecycle from 'react-pure-lifecycle';

// css
import './Landing.css'

// Components
import LandingNavBar from '../.././Components/NavBar/LandingNavBar'

// Images
var landing = require('../.././Images/landing.svg')

class Landing extends React.Component {
  render() {
    return (
          <div>
            <LandingNavBar/>
            <img id="landing_background" alt="" style ={ { backgroundImage: "url("+landing+")" } }/>
          </div>
        )}
}

export default (Landing)
