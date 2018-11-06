import React from 'react'
import lifecycle from 'react-pure-lifecycle';

// Components
import LandingNavBar from '../.././Components/NavBar/LandingNavBar'
import ResetPrompt from '../.././Components/LogInPrompt/ResetPrompt'

const methods = {

};

const Reset = (props) => (
  <div>
    <LandingNavBar />
    <ResetPrompt />
  </div>
)

export default lifecycle(methods)(Reset);
