import React from 'react'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ReactSVG from 'react-svg'
import Paper from '@material-ui/core/Paper';

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
    minHeight: '72px',
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    verticalAlign: 'middle',

    [theme.breakpoints.down(768)]: {
      paddingLeft: '5px',
      paddingRight: '5px',
    },
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
  nav_text: {
    fontSize: '18px',

    [theme.breakpoints.down(768)]: {
      fontSize: '14px',
    },
  }
});

// Images
var logo = require('../.././Images/logo.svg')

class PromptNavBar extends React.Component {
  render() {
    var return_icon
    return (
      <div className={this.props.classes.navbarContainer}>
        <AppBar className={this.props.classes.navbar} position="static">
          <Paper className={this.props.classes.paperbar}>
            <Toolbar className={this.props.classes.toolbar}>
              <NavLink to="/" className={this.props.classes.logo}>
                <ReactSVG src={logo} svgStyle={{height: 50}}/>
              </NavLink>
              <NavLink to="/signin" className={this.props.classes.link}>
                <Typography variant="body1" className={this.props.classes.nav_text}>Sign In</Typography>
              </NavLink>
              <NavLink to="/join" className={this.props.classes.link}>
                <Typography variant="body1" className={this.props.classes.nav_text}>Join</Typography>
              </NavLink>
            </Toolbar>
          </Paper>
        </AppBar>
      </div>
    );
  }
}

PromptNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PromptNavBar);
