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
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  formControl: {
    margin: theme.spacing.unit,
    flexDirection: 'row',
  },
  add_event: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
});

class BulletSelector extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      description: '',
      type: 'task',
      selected: 'mdiSquareOutline',
    };

    this.addBullet = this.addBullet.bind(this)
  }

  addBullet() {
    axios.post('http://127.0.0.1:5002/api/save_bullet', {
      params: {
        user: sessionStorage.getItem('user'),
        type: this.state.type,
        description: this.state.description,
      }
    })
    .then((response) => {
      console.log("added bullet")
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  selectorChange = event => {
    this.setState({
      selected: event.target.value }
    );

    // mdiCircleOutline = Event
    // mdiSquareOutline = Task
    // mdiTriangleOutline = Habit
    if (event.target.value === 'mdiCircleOutline')
    {
      this.setState({
        type: 'event' });
    }
    if (event.target.value === 'mdiSquareOutline')
    {
      this.setState({
        type: 'task' });
    }

    if (event.target.value === 'mdiTriangleOutline')
    {
      this.setState({
        type: 'habit' });
    }

  };

  descriptionChange = event => {
    this.setState({
      description: event.target.value });
  };

  render() {
    return(
      <div className={this.props.classes.root}>
        <FormControl className={this.props.classes.formControl}>
          <Select
            value={this.state.selected}
            onChange={this.selectorChange}
            disableUnderline={true}
          >
            <MenuItem value="mdiSquareOutline">
              <Icon path={mdiSquareOutline} size={1} />
            </MenuItem>
            <MenuItem value="mdiCircleOutline">
              <Icon path={mdiCircleOutline} size={1} />
            </MenuItem>
            <MenuItem value="mdiTriangleOutline">
              <Icon path={mdiTriangleOutline} size={1} />
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          style={{width: '50vw'}}
          value={this.state.description}
          onChange={this.descriptionChange}
        />
        <Icon className={this.props.classes.add_event} path={mdiPlus} size={1}
        onClick={() => this.addBullet()} />
      </div>
    );
  }
}

BulletSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BulletSelector);
