import React from 'react'
import lifecycle from 'react-pure-lifecycle';

// Components
import LandingNavBar from '../.././Components/NavBar/LandingNavBar'
import LogInPrompt from '../.././Components/LogInPrompt/LogInPrompt'

const methods = {

};

const LogIn = (props) => (
  <div>
    <LandingNavBar />
    <LogInPrompt />
  </div>
)

export default lifecycle(methods)(LogIn);
