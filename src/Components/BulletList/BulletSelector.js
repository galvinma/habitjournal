import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types';
import Icon from '@mdi/react'
import {  mdiSquareOutline,
          mdiCircleOutline,
          mdiTriangleOutline,
          mdiMinus,
        } from '@mdi/js'
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import './BulletSelector.css'

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
  render() {
    return(
      <div className={this.props.classes.root}>
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
              <MenuItem value="mdiMinus">
                <Icon path={mdiMinus} size={1} />
              </MenuItem>
            </Select>
          </FormControl>

          <form noValidate>
            <TextField
              id="date"
              type="date"
              defaultValue={moment.unix(this.props.selectedDate).format('YYYY-MM-DD')}
              onChange={(e) => this.props.dateChange(e)}
            />
          </form>

          <TextField
            margin="normal"
            style={{width: '30vw'}}
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
