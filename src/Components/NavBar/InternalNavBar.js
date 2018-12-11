import React from 'react'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@mdi/react'
import Paper from '@material-ui/core/Paper';
import ReactSVG from 'react-svg'
import { mdiLogout, mdiMenu, mdiFlowerOutline } from '@mdi/js'

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";
import {getAuthStatus, getCurrentUser, resetStore} from '../.././Actions/actions'

// Images
var logo = require('../.././Images/logo.svg')

const styles = theme => ({
  navbarContainer: {
    flexGrow: 1,
    border: 'none',
    position: 'static',
    zIndex: '1000',
  },
  navbar: {
    color: 'black',
    background: 'transparent',
    borderColor: 'transparent',
    border: 'none',
    boxShadow: 'none',
    width: '100%',
    position: 'static',
  },
  paperbar: {
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '20px',

    [theme.breakpoints.down(768)]: {
      marginLeft: '8px',
      marginRight: '8px',
      marginTop: '8px',
    },
  },
  toolbar_open: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    minHeight: '72px',
    marginLeft: '20px',
    marginRight: '20px',
    backgroundColor: 'rgb(255,255,255)',

    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },
  toolbar_collapse: {
    display: 'none',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    minHeight: '72px',
    marginLeft: '20px',
    marginRight: '20px',
    backgroundColor: 'rgb(255,255,255)',

    [theme.breakpoints.down(768)]: {
      paddingLeft: '0px',
      paddingRight: '0px',
      display: 'flex',
    },
  },
  link: {
    paddingLeft: '15px',
    paddingRight: '15px',
    textDecoration: 'none',
  },
  logo: {
    marginRight: 'auto',
    paddingRight: '15px',
    textDecoration: 'none',

    [theme.breakpoints.down(768)]: {
      paddingLeft: '0px',
      paddingRight: '0px',
    },
  },
  logout: {
    verticalAlign: 'middle',
  },
  nav_text: {
    fontSize: '16px',

    [theme.breakpoints.down(768)]: {
      fontSize: '14px',
    },
  }
})

class InternalNavBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  logoutUser() {
    sessionStorage.setItem('token', null);
    sessionStorage.setItem('user', null);

    // store.dispatch(getAuthStatus({
    //   auth_status: false,
    // }))
    // store.dispatch(getCurrentUser({
    //   user: null,
    // }))
    store.dispatch(resetStore())
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <div className={this.props.classes.navbarContainer}>
        <AppBar className={this.props.classes.navbar} position="static">
          <Paper className={this.props.classes.paperbar}>
            <Toolbar className={this.props.classes.toolbar_open}>
              <NavLink to="/journal" className={this.props.classes.logo}>
                <ReactSVG src={logo} svgStyle={{height: 50}}/>
              </NavLink>
              <NavLink to="/journal" className={this.props.classes.link}>
                <Typography variant="body1" className={this.props.classes.nav_text}>Journal</Typography>
              </NavLink>
              <NavLink to="/habits" className={this.props.classes.link}>
                <Typography variant="body1" className={this.props.classes.nav_text}>Habits</Typography>
              </NavLink>
              <NavLink to="/calendar" className={this.props.classes.link}>
                <Typography variant="body1" className={this.props.classes.nav_text}>Calendar</Typography>
              </NavLink>
              <NavLink to="/about" className={this.props.classes.link}>
                <Typography variant="body1" className={this.props.classes.nav_text}>About</Typography>
              </NavLink>
              <NavLink to="/" className={this.props.classes.link} onClick={() => this.logoutUser()}>
                <Icon className={this.props.classes.logout} path={mdiLogout} size={0.75} />
              </NavLink>
            </Toolbar>

            <Toolbar className={this.props.classes.toolbar_collapse}>
              <NavLink to="/" className={this.props.classes.logo}>
                <ReactSVG src={logo} svgStyle={{height: 50}}/>
              </NavLink>
              <Icon
              aria-owns={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
              path={mdiMenu} size={0.75} />
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose} >
                <MenuItem onClick={this.handleClose}>
                  <NavLink to="/journal" className={this.props.classes.link}>
                    <Typography variant="body1">Journal</Typography>
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <NavLink to="/habits" className={this.props.classes.link}>
                    <Typography variant="body1">Habits</Typography>
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <NavLink to="/calendar" className={this.props.classes.link}>
                    <Typography variant="body1">Calendar</Typography>
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <NavLink to="/about" className={this.props.classes.link}>
                    <Typography variant="body1">About</Typography>
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <NavLink to="/" className={this.props.classes.link} onClick={() => this.logoutUser()}>
                    <Typography variant="body1">Sign Out</Typography>
                  </NavLink>
                </MenuItem>
              </Menu>
            </Toolbar>
          </Paper>
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
