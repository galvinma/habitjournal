import React from 'react'
import lifecycle from 'react-pure-lifecycle';

// class
import './Landing.css'

// Components
import LandingNavBar from '../.././Components/NavBar/LandingNavBar'

// // Images
// var daisy = require('../.././Images/Daisy.svg')
// <img id="landing_background" alt="" src={daisy}/>

class Landing extends React.Component {
  render() {
    return (
          <div>
            <LandingNavBar/>
          </div>
        )}
}

export default (Landing)
