import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { TimePicker } from 'material-ui-pickers';
import { DatePicker } from 'material-ui-pickers';
import ReactSVG from 'react-svg'

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";
import { getKeyModalState, getArchiveModalState } from '../.././Actions/actions'

// CSS
import './BulletSelector.css'

var key = require('../.././Images/Icons/key.svg')
var archive = require('../.././Images/Icons/archive.svg')
var minus = require('../.././Images/Icons/minus.svg')
var checkboxBlankCircleOutline = require('../.././Images/Icons/checkbox-blank-circle-outline.svg')
var checkboxBlankTriangleOutline = require('../.././Images/Icons/checkbox-blank-triangle-outline.svg')
var checkboxBlankOutline = require('../.././Images/Icons/checkbox-blank-outline.svg')


const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  selector: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flexEnd',
    paddingLeft: '3px',
    paddingRight: '3px',
    width: '100%',
  },
  formStyle: {
    display: 'flex',
    float: 'left',
    overflow: 'hidden',
    alignItems: 'center',
    width: '100%',
  },
  check: {
    paddingLeft: '3px',
    paddingRight: '3px',
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  checkbox_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'center',
  },
  dateStyle: {
    display: 'flex',
    alignItems: 'center',
  },
  dateInput: {
    fontFamily:'Nunito',
  },
  timeInput: {
    fontFamily:'Nunito',
  },
  text_input: {
    resize: 'none',
    width: '100%',
    border:'none',
    background: 'transparent',
    outline: 'none',
    borderBottom: '1px solid black',
    verticalAlign: 'bottom',

    [theme.breakpoints.down(768)]: {
      marginLeft: '5px',
      marginRight: '5px',
    },

  },
  typo_style: {
    display: 'flex',
  },
  nav_list: {
    paddingTop: '0px',
    paddingBottom: '0px',
    marginBottom: '16px',
  },
  list_item: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '0px',

    [theme.breakpoints.down(950)]: {
      flexDirection: 'column',
    },
  },
  dates_times_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '4px',
    marginBottom: '16px',

    [theme.breakpoints.down(450)]: {
      marginTop: '4px',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  selector_text: {
    fontFamily:'Nunito',
    fontSize: '14px',
    paddingLeft: '5px',
    paddingRight: '5px',
  },
  picker_container: {
    display: 'flex',
    flexDirection: 'row',
  },
  selector_datepicker_style: {
    fontFamily:'Nunito',
    fontSize: '14px',
    width: '90px',
  },
  dash_wrapper: {
    display: 'flex',

    [theme.breakpoints.up(450)]: {
      display: 'none',
    },
  },
  dash_style: {
    width: '90px',
  },
  dash:{
    opacity: '0.25',
    width: '20px',
  },
  selector_timepicker_style: {
    fontFamily:'Nunito',
    fontSize: '14px',
    width: '65px',
  },
  icon_container: {
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    width: '100px',

    [theme.breakpoints.down(768)]: {
      display: 'flex',
    },
  },
  icon_style: {
    height: '18px',
    marginLeft: '5px',
    marginRight: '5px',
  },
  datetime_two: {
    display: "flex",
    flexDirection: "row",
  },
  dropdown: {
    minWidth: '45px'
  },
});

// <div className={this.props.classes.icon_container}>
//   <img className={this.props.classes.icon_style} src={archive} svgStyle={{ width: '20px' }} onClick={() => store.dispatch(getArchiveModalState({archive_modal_status: true}))}/>
//   <img className={this.props.classes.icon_style} src={key} svgStyle={{ width: '20px' }} onClick={() => store.dispatch(getKeyModalState({key_modal_status: true}))}/>
// </div>

class BulletSelector extends React.Component {
  render() {
    return(
      <div className={this.props.classes.root}>
        <div className={this.props.classes.nav_list}>
          <div className={this.props.classes.list_item}>
            <div className={this.props.classes.selector}>
              <FormControl>
                <Select
                  value={this.props.selected}
                  onChange={(e) => this.props.selectorChange(e)}
                  disableUnderline={true}
                  className={this.props.classes.dropdown}
                >
                  <MenuItem value="checkboxBlankOutline">
                    <img src={checkboxBlankOutline}  />
                  </MenuItem>
                  <MenuItem value="checkboxBlankCircleOutline">
                    <img src={checkboxBlankCircleOutline}  />
                  </MenuItem>
                  <MenuItem value="checkboxBlankTriangleOutline">
                    <img src={checkboxBlankTriangleOutline}  />
                  </MenuItem>
                  <MenuItem value="minus">
                    <img src={minus} />
                  </MenuItem>
                </Select>
              </FormControl>
              <div className={this.props.classes.formStyle}>
                 <input
                 id="bulletSelector"
                 className={this.props.classes.text_input}
                 onKeyDown={(e) => this.props.checkSubmit(e)} />
              </div>
              <div className={this.props.classes.icon_container}>
                <img className={this.props.classes.icon_style} src={archive} svgStyle={{ width: '20px' }} onClick={() => store.dispatch(getArchiveModalState({archive_modal_status: true}))}/>
                <img className={this.props.classes.icon_style} src={key} svgStyle={{ width: '20px' }} onClick={() => store.dispatch(getKeyModalState({key_modal_status: true}))}/>
              </div>
            </div>
          </div>
          <div className={this.props.classes.dates_times_container}>
            <div className={this.props.classes.datetime_one}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                  <DatePicker
                    id="dateone"
                    format="MM / DD / YYYY"
                    InputProps={{
                    classes: {
                        input: this.props.classes.selector_datepicker_style,
                      }
                    }}
                    value={moment.unix(this.props.startDate).format('YYYY-MM-DD')}
                    onChange={(e) => this.props.dateChange(e, "start")}/>
              </MuiPickersUtilsProvider>

              <MuiPickersUtilsProvider utils={MomentUtils}>
                  <TimePicker
                    id="timeone"
                    class="time_pick"
                    value={moment.unix(this.props.startTime)}
                    onChange={(e) => this.props.timeChange(e, "start")}
                    InputProps={{
                    classes: {
                        input: this.props.classes.selector_timepicker_style,
                      }
                    }}/>
              </MuiPickersUtilsProvider>

              <div id="to_spacer">
                <Typography component={'span'} variant="body1">to</Typography>
              </div>
            </div>
            <div className={this.props.classes.datetime_two}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                  <DatePicker
                    id="datetwo"
                    format="MM / DD / YYYY"
                    InputProps={{
                    classes: {
                        input: this.props.classes.selector_datepicker_style,
                      }
                    }}
                    value={moment.unix(this.props.endDate).format('YYYY-MM-DD')}
                    onChange={(e) => this.props.dateChange(e, "end")}/>
              </MuiPickersUtilsProvider>

              <div className={this.props.classes.dash_wrapper}>
                <div id="dash_holder" className={this.props.classes.dash_style}>
                  <img src={minus} className={this.props.classes.dash}/>
                </div>
              </div>

              <MuiPickersUtilsProvider utils={MomentUtils}>
                  <TimePicker
                    id="timetwo"
                    class="time_pick"
                    className={this.props.classes.timeInput}
                    value={moment.unix(this.props.endTime)}
                    onChange={(e) => this.props.timeChange(e, "end")}
                    InputProps={{
                    classes: {
                        input: this.props.classes.selector_timepicker_style,
                      }
                    }}/>
              </MuiPickersUtilsProvider>
            </div>
          </div>
          <div className={this.props.classes.list_item}>
            <div className={this.props.classes.checkbox_container}>
              <Checkbox
                className={this.props.classes.check}
                iconStyle={{color: 'black'}}
                checked={this.props.checkedAllDay}
                onChange={(e) => this.props.handleAllDay(e)} />
              <div className={this.props.classes.selector_text}>
                <div>All day</div>
              </div>
              <Checkbox
                className={this.props.classes.check}
                iconStyle={{color: 'black'}}
                checked={this.props.checkedMultiDay}
                onChange={(e) => this.props.handleMultiDay(e)} />
              <div className={this.props.classes.selector_text}>
                <div>Multi day</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BulletSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BulletSelector);
