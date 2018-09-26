import React from 'react'
import lifecycle from 'react-pure-lifecycle';

// Components
import InternalNavBar from '../.././Components/NavBar/InternalNavBar'

const methods = {

};

const Journal = (props) => (
  <div>
    <InternalNavBar />
    <p>This will be the journal page</p>
  </div>
)

export default lifecycle(methods)(Journal);
