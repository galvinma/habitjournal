import React from 'react'
import lifecycle from 'react-pure-lifecycle';

// Components
import LandingNavBar from '../.././Components/NavBar/LandingNavBar'

const methods = {

};

const Landing = (props) => (
  <div>
    <LandingNavBar />
  </div>
)

export default lifecycle(methods)(Landing);
