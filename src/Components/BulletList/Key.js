import React from 'react'
import PropTypes from 'prop-types';
import Icon from '@mdi/react'
import {  mdiSquareOutline,
          mdiCircleOutline,
          mdiTriangleOutline,
          mdiMinus
        } from '@mdi/js'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  icon_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flexStart',
    alignItems: 'center',
  },
  icon: {
    paddingLeft: '5px',
    paddingRight: '15px',
  },
  nav_container: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    top: '100px',

    [theme.breakpoints.down(768)]: {
      position: 'relative',
      top: 'auto',
      flexWrap: 'wrap',
    },
  },
  nav_list: {
    paddingTop: '0px',

    [theme.breakpoints.down(768)]: {
      display: 'flex',
      flexDirection: 'row',
    },
  },
});

class Key extends React.Component {
  render() {
    return(
      <div className={this.props.classes.nav_container}>
          <List className={this.props.classes.nav_list}>
            <ListItem>
              <ListItemText>
                <div className={this.props.classes.icon_container}>
                  <Icon className={this.props.classes.icon} path={mdiSquareOutline} size={0.75} />
                  <Typography variant="body1">Task</Typography>
                </div>
              </ListItemText>
            </ListItem>
            <ListItem >
              <ListItemText>
                <div className={this.props.classes.icon_container}>
                  <Icon className={this.props.classes.icon} path={mdiCircleOutline} size={0.75} />
                  <Typography variant="body1">Event</Typography>
                </div>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <div className={this.props.classes.icon_container}>
                  <Icon className={this.props.classes.icon} path={mdiTriangleOutline} size={0.75} />
                  <Typography variant="body1">Appointment</Typography>
                </div>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <div className={this.props.classes.icon_container}>
                  <Icon className={this.props.classes.icon} path={mdiMinus} size={0.75} />
                  <Typography variant="body1">Note</Typography>
                </div>
              </ListItemText>
            </ListItem>
          </List>
        </div>
    );
  }
}

Key.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Key);
