import React from 'react'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
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
    marginBottom: '10px',
  },
  link: {
    margin: '10px',
    textDecoration: 'none',
  },
  logo: {
    marginRight: 'auto',
    paddingLeft: '20px',
    paddingRight: '20px',
    textDecoration: 'none',
  },
};

class LandingNavBar extends React.Component {
  render() {
    var return_icon
    return (
      <div className={this.props.classes.navbarContainer}>
        <AppBar className={this.props.classes.navbar} position="static">
          <Toolbar className={this.props.classes.toolbar}>
            <NavLink to="/" className={this.props.classes.logo}>
              {return_icon}
            </NavLink>
            <NavLink to="/signin" className={this.props.classes.link}>
              <Typography variant="body1">Sign In</Typography>
            </NavLink>
            <NavLink to="/join" className={this.props.classes.link}>
              <Typography variant="body1">Join</Typography>
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
