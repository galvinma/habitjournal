import React from 'react'
import lifecycle from 'react-pure-lifecycle';

// Components
import InternalNavBar from '../.././Components/NavBar/InternalNavBar'
import Timer from '../.././Components/Timer/Timer'


const methods = {

};

const CountdownTimer = (props) => (
  <div>
    <InternalNavBar />
    <Timer />
  </div>
)

export default lifecycle(methods)(CountdownTimer);
