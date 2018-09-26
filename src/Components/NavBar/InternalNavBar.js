import React from 'react'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

InternalNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InternalNavBar);
