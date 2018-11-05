import React from 'react'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@mdi/react'
import { mdiLogout } from '@mdi/js'

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";
import {getAuthStatus, getCurrentUser} from '../.././Actions/actions'

const styles = {
  navbarContainer: {
    flexGrow: 1,
    border: 'none',
    position: 'fixed',
    top: '0px',
    height: '75px',
    zIndex: '1000',
  },
  navbar: {
    color: 'black',
    background: 'transparent',
    borderColor: 'transparent',
    border: 'none',
    boxShadow: 'none',
    height: '75px',
    width: '100%',
    position: 'fixed',
    top: '0px',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: '10px',
    backgroundColor: 'rgb(255,255,255)',
  },
  link: {
    paddingLeft: '20px',
    paddingRight: '20px',
    textDecoration: 'none',
  },
  logo: {
    marginRight: 'auto',
    paddingLeft: '20px',
    paddingRight: '20px',
    textDecoration: 'none',
  },
  logout: {
    verticalAlign: 'middle',
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
        <AppBar className={this.props.classes.navbar} position="static">
          <Toolbar className={this.props.classes.toolbar}>
            <NavLink to="/" className={this.props.classes.logo}>
              <Typography component="body1" variant="body1">Logo</Typography>
            </NavLink>
            <NavLink to="/journal" className={this.props.classes.link}>
              <Typography component="body1" variant="body1">Journal</Typography>
            </NavLink>
            <NavLink to="/habits" className={this.props.classes.link}>
              <Typography component="body1" variant="body1">Habits</Typography>
            </NavLink>
            <NavLink to="/calendar" className={this.props.classes.link}>
              <Typography component="body1" variant="body1">Calendar</Typography>
            </NavLink>
            <NavLink to="/about" className={this.props.classes.link}>
              <Typography component="body1" variant="body1">About</Typography>
            </NavLink>
            <NavLink to="/" className={this.props.classes.link} onClick={() => this.logoutUser()}>
              <Icon className={this.props.classes.logout} path={mdiLogout} size={0.75} />
            </NavLink>
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
