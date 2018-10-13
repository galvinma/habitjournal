import React from 'react'
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

// circle = Event
// square = Task
// triangle = Habit

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
      selected: mdiSquareOutline,
    };

    this.addBullet = this.addBullet.bind(this)
  }

  addBullet(val)
  {

  }

  selectorChange = event => {
    this.setState({
      selected: event.target.value });
  };

  descriptionChange = event => {
    this.setState({
      description: event.target.value });
  };

  render() {
    return(
      <div className={this.props.classes.root}>
        <FormControl className={this.props.classes.formControl}>
          <InputLabel htmlFor="age-simple"></InputLabel>
          <Select
            value={this.state.selected}
            onChange={this.selectorChange}
            disableUnderline={true}
          >
            <MenuItem value={mdiSquareOutline}>
              <Icon path={mdiSquareOutline} size={1} />
            </MenuItem>
            <MenuItem value={mdiCircleOutline}>
              <Icon path={mdiCircleOutline} size={1} />
            </MenuItem>
            <MenuItem value={mdiTriangleOutline}>
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
        onClick={ () => this.props.add(
          this.state.selected,
          this.state.description,)} />
      </div>
    );
  }
}

BulletSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BulletSelector);
