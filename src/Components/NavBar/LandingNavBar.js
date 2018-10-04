import React from 'react'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
  grow: {
    flexGrow: 1,
  },
};

class LandingNavBar extends React.Component {
  render() {
    return (
      <div className={this.props.classes.navbarContainer}>
        <AppBar className={this.props.classes.navbar} position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={this.props.classes.grow}>
              <Button color="inherit" componentClass={NavLink} href="/#">
                Website Title
              </Button>
            </Typography>
            <Button color="inherit" componentClass={NavLink} href="/#/login">Login</Button>
            <Button color="inherit" componentClass={NavLink} href="/#/signup">Sign Up</Button>
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
