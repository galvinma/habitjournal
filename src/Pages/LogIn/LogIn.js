import React from 'react'
import lifecycle from 'react-pure-lifecycle';

// Components
import LandingNavBar from '../.././Components/NavBar/LandingNavBar'
import LogInPrompt from '../.././Components/LogInPrompt/LogInPrompt'

class LogIn extends React.Component {
  render() {
    return (
  <div>
    <LandingNavBar />
    <LogInPrompt />
  </div>
)}
}

export default (LogIn);
