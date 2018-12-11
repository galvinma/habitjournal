import React from 'react'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  navbarContainer: {
    flexGrow: 1,
    border: 'none',
  },
  navbar: {
    backgroundColor: 'transparent',
    background: 'transparent',
    borderColor: 'transparent',
    border: 'none',
    boxShadow: 'none',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '20px',
    marginBottom: '10px',

    [theme.breakpoints.down(768)]: {
      marginLeft: '8px',
      marginRight: '8px',
    },

    [theme.breakpoints.down(500)]: {
      marginLeft: '0px',
      marginRight: '0px',
    },
  },
  link: {
    margin: '10px',
    textDecoration: 'none',
  },
  join: {
    margin: '10px',
    textDecoration: 'none',
    color: '#93AAB5',
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingTop: '5px',
    paddingBottom: '5px',
    borderRadius: '2px',
    border: '2px solid #93AAB5',
  },
  logo: {
    marginRight: 'auto',
    paddingLeft: '20px',
    paddingRight: '20px',
    textDecoration: 'none',
  },
  nav_text: {
    fontSize: '18px',

    [theme.breakpoints.down(768)]: {
      fontSize: '16px',
    },
  }
});

class LandingNavBar extends React.Component {
  render() {
    var return_icon
    return (
      <div className={this.props.classes.navbarContainer}>
        <AppBar className={this.props.classes.navbar} position="static">
          <Toolbar className={this.props.classes.toolbar}>
            <NavLink to="/signin" className={this.props.classes.link}>
              <Typography variant="body1" className={this.props.classes.nav_text}>Sign In</Typography>
            </NavLink>
            <NavLink to="/join" className={this.props.classes.join}>
              <Typography variant="body1" className={this.props.classes.nav_text}>Join</Typography>
            </NavLink>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

LandingNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingNavBar);
