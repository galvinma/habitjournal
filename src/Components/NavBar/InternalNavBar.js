import React from 'react'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";
import {getAuthStatus, getCurrentUser} from '../.././Actions/actions'

const styles = {
  navbarContainer: {
    flexGrow: 1,
    border: 'none',
  },
  navbar: {
    color: 'black',
    backgroundColor: 'transparent',
    background: 'transparent',
    borderColor: 'transparent',
    border: 'none',
    boxShadow: 'none',
  },
  grow: {
    flexGrow: 1,
  },
  spread:
  {
    display: 'flex',
    justifyContent: "space-between",
  },
  center_items:
  {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  }
};

class InternalNavBar extends React.Component {

  logoutUser() {
    sessionStorage.setItem('token', null);
    sessionStorage.setItem('user', null);

    store.dispatch(getAuthStatus({
      auth_status: false,
    }))
    store.dispatch(getCurrentUser({
      user: null,
    }))
  }

  render() {
    return (
      <div className={this.props.classes.navbarContainer}>
        <AppBar className={this.props.classes.navbar} position="static">
          <Toolbar className={this.props.classes.spread}>
            <NavLink to="/">Website Title</NavLink>
            <div className={this.props.classes.center_items}>
              <NavLink to="/journal">journal</NavLink>
              <div>/</div>
              <NavLink to="/habits">habits</NavLink>
              <div>/</div>
              <NavLink to="/calendar">calendar</NavLink>
            </div>
            <NavLink to="/" onClick={() => this.logoutUser()}>LOG OUT</NavLink>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

InternalNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth_status: state.auth_status,
    current_user: state.current_user
  }
}

export default connect(mapStateToProps)(withStyles(styles)(InternalNavBar));
