import React from 'react'
import { Redirect } from 'react-router-dom';
import lifecycle from 'react-pure-lifecycle';

// Components
import InternalNavBar from '../.././Components/NavBar/InternalNavBar'

// functions
import { checkAuth } from '../.././Utils/checkauth'

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";


class Journal extends React.Component {
  constructor(props){
  super(props);

  checkAuth()

  }

  render() {
    if (store.getState().auth_status.auth_status === false) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <InternalNavBar />
        <p>This will be the journal page</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth_status: state.auth_status,
    current_user: state.current_user
  }
}

export default connect(mapStateToProps)(Journal);
