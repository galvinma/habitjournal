import React from 'react'
import lifecycle from 'react-pure-lifecycle';

// Components
import InternalNavBar from '../.././Components/NavBar/InternalNavBar'

const methods = {

};

const Calendar = (props) => (
  <div>
    <InternalNavBar />
    <p>This will be the calendar page</p>
  </div>
)


export default lifecycle(methods)(Calendar);
