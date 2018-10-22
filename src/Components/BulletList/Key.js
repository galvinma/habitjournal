import React from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';
import Icon from '@mdi/react'
import {  mdiSquare,
          mdiSquareOutline,
          mdiCircle,
          mdiCircleOutline,
          mdiTriangle,
          mdiTriangleOutline,
          mdiPlus,
        } from '@mdi/js'
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';


// mdiCircle = Event
// mdiSquareOutline = Task
// mdiTriangle = Habit

const styles = theme => ({
  key_container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    minWidth: '15vw',
    marginLeft: '5vw',
  },
  icon_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

class Key extends React.Component {
  constructor(props)
  {
    super(props);
  }

  // mdiCircleOutline = Event
  // mdiSquareOutline = Task
  // mdiTriangleOutline = Habit
  render() {
    return(
      <div className={this.props.classes.key_container}>
        <div className={this.props.classes.icon_container}>
          <Icon path={mdiSquareOutline} size={0.75} />
          <p>task</p>
        </div>
        <div className={this.props.classes.icon_container}>
          <Icon path={mdiCircleOutline} size={0.75} />
          <p>event</p>
        </div>
        <div className={this.props.classes.icon_container}>
          <Icon path={mdiTriangleOutline} size={0.75} />
          <p>habit</p>
        </div>
      </div>
    );
  }
}

Key.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Key);
