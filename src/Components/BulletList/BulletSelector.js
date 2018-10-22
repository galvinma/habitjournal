import React from 'react'
import axios from 'axios';
import moment from 'moment'
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

import './BulletSelector.css'
// mdiCircle = Event
// mdiSquareOutline = Task
// mdiTriangle = Habit

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  selector: {
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
  }

  render() {
    return(
      <div className={this.props.classes.root}>
        <form noValidate>
          <TextField
            id="date"
            type="date"
            defaultValue={this.props.selectedDate}
          />
        </form>
        <div className={this.props.classes.selector}>
          <FormControl className={this.props.classes.formControl}>
            <Select
              value={this.props.selected}
              onChange={(e) => this.props.selectorChange(e)}
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
            value={this.props.description}
            onChange={(e) => this.props.descriptionChange(e)}
            onKeyDown={(e) => this.props.checkSubmit(e)} />
        </div>
      </div>
    );
  }
}

BulletSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BulletSelector);
