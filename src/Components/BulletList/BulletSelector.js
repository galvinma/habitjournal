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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

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
    justifyContent: 'flex-start',
    alignItems: 'flexEnd',
  },
  formStyle: {
    display: 'flex',
    alignItems: 'center',
  },
  dateStyle: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  dateInput: {
    borderBottom: 'none',
    border:'none',
    outline: 'none',
  },
  text_input: {
    width: '30vw',
    border:'none',
    outline: 'none',
    borderBottom: '1px solid black',
    verticalAlign: 'bottom',
  },
  typo_style: {
    display: 'flex',
  },
  nav_list: {
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  list_item: {
    paddingTop: '6px',
    paddingBottom: '6px',
    paddingLeft: '0px',
  },
});

class BulletSelector extends React.Component {
  render() {
    return(
      <div className={this.props.classes.root}>
        <List className={this.props.classes.nav_list}>
          <ListItem className={this.props.classes.list_item}>
            <div className={this.props.classes.selector}>
              <FormControl>
                <Select
                  value={this.props.selected}
                  onChange={(e) => this.props.selectorChange(e)}
                  disableUnderline={true}
                >
                  <MenuItem value="mdiSquareOutline">
                    <Icon path={mdiSquareOutline} size={0.75} />
                  </MenuItem>
                  <MenuItem value="mdiCircleOutline">
                    <Icon path={mdiCircleOutline} size={0.75} />
                  </MenuItem>
                  <MenuItem value="mdiTriangleOutline">
                    <Icon path={mdiTriangleOutline} size={0.75} />
                  </MenuItem>
                  <MenuItem value="mdiMinus">
                    <Icon path={mdiMinus} size={0.75} />
                  </MenuItem>
                </Select>
              </FormControl>

              <form className={this.props.classes.dateStyle}>
                <Typography variant="body1">
                  <input
                    className={this.props.classes.dateInput}
                    id="date"
                    type="date"
                    defaultValue={moment.unix(this.props.selectedDate).format('YYYY-MM-DD')}
                    onChange={(e) => this.props.dateChange(e)}
                  />
                </Typography>
              </form>

              <form className={this.props.classes.formStyle}>
                <Typography variant="body1">
                   <input
                   className={this.props.classes.text_input}
                   defaultValue={this.props.title}
                   onChange={(e) => this.props.titleChange(e)}
                   onKeyDown={(e) => this.props.checkSubmit(e)} />
                </Typography>
              </form>
            </div>
          </ListItem>
        </List>
      </div>
    );
  }
}

BulletSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BulletSelector);
