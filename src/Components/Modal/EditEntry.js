import React from 'react'
import moment from 'moment'
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@mdi/react'
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MomentUtils from '@date-io/moment'
import ReactSVG from 'react-svg'
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { TimePicker } from 'material-ui-pickers';
import { DatePicker } from 'material-ui-pickers';
import {  mdiClose,
          mdiDotsHorizontal } from '@mdi/js'

// functions
import { convertToIconStringNoMult } from '../.././Utils/convertoiconstring_entryedit'
import { dateChange } from '../.././Utils/datechange'
import { timeChange } from '../.././Utils/timechange'
import { handleMultiDay } from '../.././Utils/handlemultiday'
import { handleAllDay } from '../.././Utils/handleallday'
import { selectorChangeWithStatus } from '../.././Utils/selectorchangewithstatus'
import { updateStoreEntry } from '../.././Utils/updatestoreentry'
import { updateAllUIEntries } from '../.././Utils/updatealluientries'

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";

// Images and Icons
var minus = require('../.././Images/Icons/minus.svg')
var checkboxBlankCircleOutline = require('../.././Images/Icons/checkbox-blank-circle-outline.svg')
var checkboxBlankCircle = require('../.././Images/Icons/checkbox-blank-circle.svg')
var checkboxBlankOutline = require('../.././Images/Icons/checkbox-blank-outline.svg')
var checkboxBlankTriangleOutline = require('../.././Images/Icons/checkbox-blank-triangle-outline.svg')
var checkboxBlankTriangle = require('../.././Images/Icons/checkbox-blank-triangle.svg')
var checkboxBlank = require('../.././Images/Icons/checkbox-blank.svg')
var checkboxMultipleBlankCircleOutline = require('../.././Images/Icons/checkbox-multiple-blank-circle-outline.svg')
var checkboxMultipleBlankCircle = require('../.././Images/Icons/checkbox-multiple-blank-circle.svg')
var checkboxMultipleBlankOutline = require('../.././Images/Icons/checkbox-multiple-blank-outline.svg')
var checkboxMultipleBlankTriangleOutline = require('../.././Images/Icons/checkbox-multiple-blank-triangle-outline.svg')
var checkboxMultipleBlankTriangle = require('../.././Images/Icons/checkbox-multiple-blank-triangle.svg')
var checkboxMultipleBlank = require('../.././Images/Icons/checkbox-multiple-blank.svg')
var flowerOutline = require('../.././Images/Icons/flower-outline.svg')
var flower = require('../.././Images/Icons/flower.svg')
var weatherNight = require('../.././Images/Icons/weather-night.svg')
var weatherSunset = require('../.././Images/Icons/weather-sunset.svg')

const styles = theme => ({
  close: {
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '10px',
    paddingBottom: '0px',
  },
  close_container: {
    textAlign: 'right',
  },
  check: {
    paddingLeft: '3px',
    paddingRight: '3px',
  },
  dateStyle: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  dateInput: {
    fontFamily:'Nunito',
    paddingLeft: '2px',
    paddingRight: '2px',
  },
  formStyle: {
    display: 'flex',
    float: 'left',
    overflow: 'hidden',
    alignItems: 'center',
    minWidth: theme.spacing.unit * 40,

    [theme.breakpoints.down(768)]: {
      minWidth: theme.spacing.unit * 25,
    },

  },
  list_item: {
    paddingTop: '6px',
    paddingBottom: '6px',
    paddingLeft: '0px',
  },
  nav_list: {
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  picker_container: {
    display: 'flex',
    flexDirection: 'row',
  },
  selector_text: {
    paddingLeft: '5px',
    paddingRight: '5px',
  },
  selector: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flexEnd',
    paddingLeft: '3px',
    paddingRight: '3px',
  },
  selector_datepicker_style: {
    fontSize: '0.875em',
  },
  selector_timepicker_style: {
    fontSize: '0.875em',
    width: '65px',
  },
  timeInput: {
    fontFamily:'Nunito',
  },
  text_input: {
    fontSize: '0.875em',
    minWidth: theme.spacing.unit * 40,
    border:'none',
    outline: 'none',
    borderBottom: '1px solid black',
    verticalAlign: 'bottom',

    [theme.breakpoints.down(768)]: {
      minWidth: theme.spacing.unit * 25,
    },
  },
  typo_style: {
    display: 'flex',
  },
});

class EditEntry extends React.Component {
  constructor(props)
  {
    super(props);

    super(props);
    this.state = {
      reference: "",
      entry: null,
      selected: "",
      type: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      title: "",
      status: "",
      multi_day: null,
      all_day: null,
      checkedAllDay: false,
      checkedMultiDay: false,
    }

    this.convertToIconStringNoMult = convertToIconStringNoMult.bind(this)
    this.selectorChangeWithStatus = selectorChangeWithStatus.bind(this)
    this.resetState = this.resetState.bind(this)
    this.getMatch = this.getMatch.bind(this)
    this.updateEntry = this.updateEntry.bind(this)
    this.blurHandler = this.blurHandler.bind(this)
    this.dateChange = dateChange.bind(this)
    this.timeChange = timeChange.bind(this)
    this.handleAllDay = handleAllDay.bind(this)
    this.handleMultiDay = handleMultiDay.bind(this)
    this.updateStoreEntry = updateStoreEntry.bind(this)
    this.updateAllUIEntries = updateAllUIEntries.bind(this)
  }

  getMatch()
  {
    if (store.getState().current_entry.current_entry)
    {
      var res = store.getState().current_entry.current_entry

    if (res.all_day === true)
    {
      this.setState({
        checkedAllDay: true,
      })
    }
    else
    {
      this.setState({
        checkedAllDay: false,
      })
    }

    if (res.multi_day === true)
    {
      this.setState({
        checkedMultiDay: true,
      })
    }
    else
    {
      this.setState({
      checkedMultiDay: false,
      })
    }

    // Set UI toggles on modal
    var l = document.getElementsByClassName("time_pick")

    if (res.multi_day === true && res.all_day === true)
    {
      if (document.getElementById("to_spacer"))
      {
        document.getElementById("to_spacer").style.display = "inline-block"
      }

      if (document.getElementById("datetwo"))
      {
        document.getElementById("datetwo").style.display = "inline-block"
      }

      var l = document.getElementsByClassName("time_pick")
      for (var i = 0; i < l.length; i++)
      {
       l[i].style.display = "none"
      }
    }
    else if (res.multi_day === false && res.all_day === true)
    {
      if (document.getElementById("to_spacer"))
      {
        document.getElementById("to_spacer").style.display = "none"
      }

      if (document.getElementById("datetwo"))
      {
        document.getElementById("datetwo").style.display = "none"
      }

      for (var i = 0; i < l.length; i++)
      {
       l[i].style.display = "none"
      }
    }
    else if (res.multi_day === true && res.all_day === false)
    {
      if (document.getElementById("to_spacer"))
      {
        document.getElementById("to_spacer").style.display = "inline-block"
      }

      if (document.getElementById("datetwo"))
      {
        document.getElementById("datetwo").style.display = "inline-block"
      }

      for (var i = 0; i < l.length; i++)
      {
       l[i].style.display = "inline-block"
      }
    }
    else if (res.multi_day === false && res.all_day === false)
    {
      if (document.getElementById("to_spacer"))
      {
        document.getElementById("to_spacer").style.display = "inline-block"
      }

      if (document.getElementById("datetwo"))
      {
        document.getElementById("datetwo").style.display = "none"
      }

      for (var i = 0; i < l.length; i++)
      {
       l[i].style.display = "inline-block"
      }
    }
      this.setState({
        reference: res.start_date,
        entry: res,
        selected: this.convertToIconStringNoMult(res),
        type: res.type,
        startDate: res.start_date,
        endDate: res.end_date,
        startTime: res.start_time,
        endTime: res.end_time,
        title: res.title,
        status: res.status,
        multi_day: res.multi_day,
        all_day: res.all_day,
      })
    }
  }

  resetState()
  {
    this.setState({
      reference: "",
      entry: null,
      selected: "",
      type: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: '',
      title: "",
      status: "",
      multi_day: null,
      all_day: null,
      checkedAllDay: false,
      checkedMultiDay: false,
    })
  }

  updateEntry()
  {
    let endDate
    let endTime
    if (this.state.checkedMultiDay === false && this.state.checkedAllDay === true)
    {
      // Single Day / All Day
      // Set end date and time
      endDate = moment.unix(this.state.startDate).startOf('day').unix()
      endTime = moment.unix(this.state.startDate).endOf('day').unix()
    }
    else if (this.state.checkedMultiDay === true && this.state.checkedAllDay === false )
    {
      // Multi / Timed
      // Use set values
      endDate = this.state.endDate
      endTime = this.state.endTime
    }
    else if (this.state.checkedMultiDay === true && this.state.checkedAllDay === true )
    {
      // Multi Day / All Day
      // Set end time
      endDate = this.state.endDate
      endTime = moment.unix(this.state.endDate).endOf('day').unix()
    }
    else if (this.state.checkedMultiDay === false && this.state.checkedAllDay === false )
    {
      // Single Day / Timed
      // Set end date and time
      endDate = moment.unix(this.state.startDate).startOf('day').unix()
      endTime = this.state.endTime
    }

    // Update UI
    let parameters = {
      entry_id: store.getState().entries_modal_id.entries_modal_id,
      type: this.state.type,
      start_date: this.state.startDate,
      end_date: endDate,
      start_time: this.state.startTime,
      end_time: endTime,
      title: this.state.title,
      status: this.state.status,
      multi_day: this.state.checkedMultiDay,
      all_day: this.state.checkedAllDay,
    }
    this.updateStoreEntry(parameters)
    .then((response) => {
      this.props.updateAllUIEntries()
    })
    .catch((error) => {
      console.log(error);
    });

    // Update DB
    axios.post('http://127.0.0.1:5002/api/update_entry', {
      params: {
        entry_id: store.getState().entries_modal_id.entries_modal_id,
        type: this.state.type,
        start_date: this.state.startDate,
        end_date: endDate,
        start_time: this.state.startTime,
        end_time: endTime,
        title: this.state.title,
        status: this.state.status,
        multi_day: this.state.checkedMultiDay,
        all_day: this.state.checkedAllDay,
      }
    })
    .then((response) => {
      this.props.handleModalClose("edit")
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  blurHandler(event)
  {
    this.setState({
      title: event.target.value
    });
  }

  render() {
    if (this.state.entry)
    {
      var title = this.state.entry.title
      var initial_svg = this.state.initial_svg
    }

    return(
      <div key={this.props.entries_modal_id.entries_modal_id}>
      <Dialog
        onEnter={this.getMatch}
        onExited={this.resetState}
        open={this.props.edit_entries_modal_status.edit_entries_modal_status}
        onClose={this.props.handleModalClose}>
          <div className={this.props.classes.close_container}>
            <Icon
              path={mdiClose}
              size={1}
              className={this.props.classes.close}
              onClick={() => this.props.handleModalClose("edit")}/>
          </div>
          <DialogTitle id="dialog_title">Edit Entry</DialogTitle>
          <DialogContent>
            <List className={this.props.classes.nav_list} key={this.state.entry_id}>
              <ListItem className={this.props.classes.list_item}>
                <div className={this.props.classes.selector}>
                  <FormControl>
                    <Select
                      value={this.state.selected}
                      onChange={(e) => this.selectorChangeWithStatus(e)}
                      disableUnderline={true}
                    >
                      <MenuItem value="checkboxBlankOutline">
                        <ReactSVG src={checkboxBlankOutline} svgStyle={{ height: '20px' }}/>
                      </MenuItem>
                      <MenuItem value="checkboxBlank">
                        <ReactSVG src={checkboxBlank} svgStyle={{ height: '20px' }}/>
                      </MenuItem>
                      <MenuItem value="checkboxBlankCircleOutline">
                        <ReactSVG src={checkboxBlankCircleOutline} svgStyle={{ height: '20px' }}/>
                      </MenuItem>
                      <MenuItem value="checkboxBlankCircle">
                        <ReactSVG src={checkboxBlankCircle} svgStyle={{ height: '20px' }}/>
                      </MenuItem>
                      <MenuItem value="checkboxBlankTriangleOutline">
                        <ReactSVG src={checkboxBlankTriangleOutline} svgStyle={{ height: '20px' }}/>
                      </MenuItem>
                      <MenuItem value="checkboxBlankTriangle">
                        <ReactSVG src={checkboxBlankTriangle} svgStyle={{ height: '20px' }}/>
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <form className={this.props.classes.formStyle}>
                     <input
                     key={this.state.title}
                     id="bulletSelector"
                     className={this.props.classes.text_input}
                     defaultValue={this.state.title}
                     onBlur={this.blurHandler} />
                  </form>
                </div>
              </ListItem>
              <ListItem className={this.props.classes.list_item}>
                <Checkbox
                  className={this.props.classes.check}
                  iconStyle={{color: 'black'}}
                  checked={this.state.checkedAllDay}
                  onChange={(e) => this.handleAllDay(e)} />
                <div className={this.props.classes.selector_text}>
                  <Typography variant="body1">All day</Typography>
                </div>
                <Checkbox
                  className={this.props.classes.check}
                  iconStyle={{color: 'black'}}
                  checked={this.state.checkedMultiDay}
                  onChange={(e) => this.handleMultiDay(e)} />
                <div className={this.props.classes.selector_text}>
                  <Typography variant="body1">Multi day</Typography>
                </div>
              </ListItem>
              <ListItem className={this.props.classes.list_item}>
                <Typography variant="body1">
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DatePicker
                        className={this.props.classes.dateInput}
                        id="dateone"
                        type="date"
                        format="YYYY-MM-DD"
                        InputProps={{
                        classes: {
                            input: this.props.classes.selector_datepicker_style,
                          }
                        }}
                        value={moment.unix(this.state.startDate).format('YYYY-MM-DD')}
                        onChange={(e) => this.dateChange(e, "start")}/>
                  </MuiPickersUtilsProvider>
                </Typography>
                <Typography variant="body1">
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                      <TimePicker
                        id="timeone"
                        class="time_pick"
                        value={moment.unix(this.state.startTime)}
                        onChange={(e) => this.timeChange(e, "start")}
                        InputProps={{
                        classes: {
                            input: this.props.classes.selector_timepicker_style,
                          }
                        }}/>
                  </MuiPickersUtilsProvider>
                </Typography>

                <div id="to_spacer">
                  <Typography variant="body1">to</Typography>
                </div>

                <Typography variant="body1">
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DatePicker
                        className={this.props.classes.dateInput}
                        id="datetwo"
                        type="date"
                        format="YYYY-MM-DD"
                        InputProps={{
                        classes: {
                            input: this.props.classes.selector_datepicker_style,
                          }
                        }}
                        value={moment.unix(this.state.endDate).format('YYYY-MM-DD')}
                        onChange={(e) => this.dateChange(e, "end")}/>
                  </MuiPickersUtilsProvider>
                </Typography>
                <Typography variant="body1">
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                      <TimePicker
                        id="timetwo"
                        class="time_pick"
                        className={this.props.classes.timeInput}
                        value={moment.unix(this.state.endTime)}
                        onChange={(e) => this.timeChange(e, "end")}
                        InputProps={{
                        classes: {
                            input: this.props.classes.selector_timepicker_style,
                          }
                        }}/>
                  </MuiPickersUtilsProvider>
                </Typography>
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => {
                  this.props.removeEntry(store.getState().entries_modal_id.entries_modal_id)
                  this.props.handleModalClose("edit")
                }}
                color="primary">
              <Typography variant="body1">Delete</Typography>
            </Button>
            <Button onClick={() => this.props.handleModalClose("edit")} color="primary">
              <Typography variant="body1">Cancel</Typography>
            </Button>
            <Button onClick={this.updateEntry} color="primary">
              <Typography variant="body1">Confirm</Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}


EditEntry.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    edit_entries_modal_status: state.edit_entries_modal_status,
    entries_modal_id: state.entries_modal_id
  }
}
export default connect(mapStateToProps)(withStyles(styles)(EditEntry));
