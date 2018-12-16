import React from 'react'
import lifecycle from 'react-pure-lifecycle';

// css
import './Landing.css'
import '../.././Images/Prompt.css'

// Components
import LandingNavBar from '../.././Components/NavBar/LandingNavBar'
import LandingCard from '../.././Components/Cards/LandingCard'

// Images
var landing = require('../.././Images/landing.svg')

class Landing extends React.Component {
  componentDidMount()
  {
    for (var icon in this.props.icons)
    {
      var i = new Image()
      i.src = this.props.icons[icon]
    }
  }
  render() {
    return (
      <div>
        <LandingNavBar />
        <LandingCard />
        <div id="block_one"/>
        <div id="block_two"/>
        <svg viewBox="0 0 100 100" id="landing_background" alt="" style ={{ backgroundImage: "url("+landing+")" }}/>
      </div>
  )}
}

export default (Landing)
