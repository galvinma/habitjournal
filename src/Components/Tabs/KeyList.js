import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@mdi/react'
import {  mdiSquareOutline,
          mdiCircleOutline,
          mdiTriangleOutline,
          mdiMinus
        } from '@mdi/js'

const styles = theme => ({
  icon: {
    paddingLeft: '5px',
    paddingRight: '15px',
  },
  icon_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flexStart',
    alignItems: 'center',
  },
})
class KeyList extends React.Component {
  render() {
    return (
      <div>
        <List>
          <ListItem>
              <div className={this.props.classes.icon_container}>
                <Icon className={this.props.classes.icon} path={mdiSquareOutline} size={0.75} />
                <Typography variant="body1">Task</Typography>
              </div>
          </ListItem>
          <ListItem >
              <div className={this.props.classes.icon_container}>
                <Icon className={this.props.classes.icon} path={mdiCircleOutline} size={0.75} />
                <Typography variant="body1">Event</Typography>
              </div>
          </ListItem>
          <ListItem>
              <div className={this.props.classes.icon_container}>
                <Icon className={this.props.classes.icon} path={mdiTriangleOutline} size={0.75} />
                <Typography variant="body1">Appointment</Typography>
              </div>
          </ListItem>
          <ListItem>
              <div className={this.props.classes.icon_container}>
                <Icon className={this.props.classes.icon} path={mdiMinus} size={0.75} />
                <Typography variant="body1">Note</Typography>
              </div>
          </ListItem>
        </List>

    </div>
  )}
}


KeyList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(KeyList);
