import React from 'react'
import lifecycle from 'react-pure-lifecycle';

// Components
import LandingNavBar from '../.././Components/NavBar/LandingNavBar'
import SignUpPrompt from '../.././Components/SignUpPrompt/SignUpPrompt'

const methods = {

};

const SignUp = (props) => (
  <div>
    <LandingNavBar />
    <SignUpPrompt />
  </div>
)

export default lifecycle(methods)(SignUp);
