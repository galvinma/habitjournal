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

const styles = theme => ({
  icon_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flexStart',
  },
  icon: {
    paddingLeft: '5px',
    paddingRight: '15px',
    paddingBottom: '10px',
  },
  nav_container: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '15vw',
    top: '100px',
  },
});

class Key extends React.Component {
  render() {
    return(
      <div className={this.props.classes.nav_container}>
        <div className={this.props.classes.icon_container}>
          <Icon className={this.props.classes.icon} path={mdiSquareOutline} size={0.75} />
          <Typography component="body1" variant="body1">Task</Typography>
        </div>
        <div className={this.props.classes.icon_container}>
          <Icon className={this.props.classes.icon} path={mdiCircleOutline} size={0.75} />
          <Typography component="body1" variant="body1">Event</Typography>
        </div>
        <div className={this.props.classes.icon_container}>
          <Icon className={this.props.classes.icon} path={mdiTriangleOutline} size={0.75} />
          <Typography component="body1" variant="body1">Appointment</Typography>
        </div>
        <div className={this.props.classes.icon_container}>
          <Icon className={this.props.classes.icon} path={mdiMinus} size={0.75} />
          <Typography component="body1" variant="body1">Note</Typography>
        </div>
      </div>
    );
  }
}

Key.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Key);
