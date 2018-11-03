import React from 'react'
import PropTypes from 'prop-types';
import Icon from '@mdi/react'
import {  mdiSquareOutline,
          mdiCircleOutline,
          mdiTriangleOutline,
          mdiMinus
        } from '@mdi/js'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  key_container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    minWidth: '15vw',
    marginLeft: '5vw',
    alignItems: 'center',
    height: '90vh'
  },
  icon_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: '10',
  },
});

class Key extends React.Component {
  render() {
    return(
      <div className={this.props.classes.key_container}>
        <div className={this.props.classes.icon_container}>
          <Icon path={mdiSquareOutline} size={0.75} />
          <p>Task</p>
        </div>
        <div className={this.props.classes.icon_container}>
          <Icon path={mdiCircleOutline} size={0.75} />
          <p>Event</p>
        </div>
        <div className={this.props.classes.icon_container}>
          <Icon path={mdiTriangleOutline} size={0.75} />
          <p>Appointment</p>
        </div>
        <div className={this.props.classes.icon_container}>
          <Icon path={mdiMinus} size={0.75} />
          <p>Note</p>
        </div>
      </div>
    );
  }
}

Key.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Key);
