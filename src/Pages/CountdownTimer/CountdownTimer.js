import React from 'react'
import { Redirect } from 'react-router-dom';
import lifecycle from 'react-pure-lifecycle';

// Components
import InternalNavBar from '../.././Components/NavBar/InternalNavBar'
import Timer from '../.././Components/Timer/Timer'

// functions
import { checkAuth } from '../.././Utils/checkauth'

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";

class CountdownTimer extends React.Component {
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
        <Timer />
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

export default connect(mapStateToProps)(CountdownTimer);
