import React from 'react'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";
import {getAuthStatus, getCurrentUser} from '../.././Actions/actions'

const styles = {
  navbarContainer: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
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
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={this.props.classes.grow}>
              <Button color="inherit" componentClass={NavLink} href="/#/">
                Website Title
              </Button>
            </Typography>
            <Button color="inherit" componentClass={NavLink} href="/#/timer">TIMER</Button>
            <Button color="inherit" componentClass={NavLink} href="/#/journal">JOURNAL</Button>
            <Button color="inherit" componentClass={NavLink} href="/#/calendar">CALENDAR</Button>
            <Button color="inherit" componentClass={NavLink} href="/" onClick={() => this.logoutUser()}>LOG OUT</Button>
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
