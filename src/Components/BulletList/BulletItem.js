import React from 'react'
import PropTypes from 'prop-types';
import Icon from '@mdi/react'
import {  mdiSquare,
          mdiSquareOutline,
          mdiCircle,
          mdiCircleOutline,
          mdiTriangle,
          mdiTriangleOutline
        } from '@mdi/js'
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';


// circle = Event
// square = Task
// triangle = Appt

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class BulletList extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      data: [],
      selected: mdiSquareOutline,
    };
  }

  handleChange = event => {
    this.setState({
      selected: event.target.value });
  };

  addBullet(val)
  {
    const bullet = {
      description: val
    }

    this.state.data.push(bullet)
    this.setState({
      data: this.state.data
    })
  }

  render() {
    return(
      <div>
        <FormControl className={this.props.classes.formControl}>
          <InputLabel>
            <Icon path={this.state.selected} size={1} />
          </InputLabel>
          <Select
            onChange={this.handleChange}
            disableUnderline={true} 
          >
            <MenuItem value={mdiSquareOutline}>
              <Icon path={mdiSquareOutline} size={1} />
              <p>Task</p>
            </MenuItem>
            <MenuItem value={mdiCircleOutline}>
              <Icon path={mdiCircleOutline} size={1} />
              <p>Event</p>
            </MenuItem>
            <MenuItem value={mdiTriangleOutline}>
              <Icon path={mdiTriangleOutline} size={1} />
              <p>Appointment</p>
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="normal"
        />
      </div>
    );
  }
}

BulletList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BulletList);
