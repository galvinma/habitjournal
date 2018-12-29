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
import { selectorChangeWithStatus } from '../.././Utils/selectorchangewithstatus'
import { updateStoreEntry } from '../.././Utils/updatestoreentry'
import { updateAllUIEntries } from '../.././Utils/updatealluientries'

// CSS
import './JournalEdit.css'

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";
import { getSnackBarState, getSnackBarMessage } from '../.././Actions/actions'

// Functions
import { verifyUnixInputs } from '../.././Utils/verifyunixinputs'
import { startDateBeforeEndDate } from '../.././Utils/startdate_before_enddate'
import { startTimeBeforeEndTime } from '../.././Utils/starttime_before_endtime'
import { sameDay } from '../.././Utils/same_day'
import { missingTitle } from '../.././Utils/missing_title'


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
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  dialog_root: {
    width: '400px',
    maxWidth: '600px',

    [theme.breakpoints.down(768)]: {
      marginLeft: '8px',
      marginRight: '8px',
    },
  },
  close: {
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '10px',
    paddingBottom: '0px',
  },
  close_container: {
    textAlign: 'right',
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
  dates_times_container_journal: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
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
  datetime_two: {
    display: "flex",
    flexDirection: "row",
  },
  datetime_one: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    minWidth: '45px'
  },
});


class JournalEdit extends React.Component {
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
    this.handleAllDay = this.handleAllDay.bind(this)
    this.handleMultiDay = this.handleMultiDay.bind(this)
    this.updateStoreEntry = updateStoreEntry.bind(this)
    this.updateAllUIEntries = updateAllUIEntries.bind(this)
  }

  handleMultiDay(event)
  {
    this.setState({ checkedMultiDay: event.target.checked });

    //  Reset the pickers...
    if (event.target.checked === false && this.state.checkedAllDay === true)
    {
      this.setState({
        endDate: moment().startOf('day').unix(),
        endTime: moment().endOf('day').unix(),
      })
    }
    else if (event.target.checked === false && this.state.checkedAllDay === false)
    {
      this.setState({
        endDate: moment.unix(this.state.startDate).startOf('day').unix(),
        endTime: moment.unix(this.state.startDate).endOf('day').unix()
      })
    }
    else if (event.target.checked === true && this.state.checkedAllDay === false)
    {
      this.setState({
        endDate: moment().startOf('day').unix(),
        endTime: moment().endOf('day').unix(),
      })
    }
    else if (event.target.checked === true && this.state.checkedAllDay === true)
    {
      this.setState({
        startTime: moment.unix(this.state.startDate).startOf('day').unix(),
        endTime: moment.unix(this.state.startDate).endOf('day').unix()
      })
    }

    // UI handles...
    if (event.target.checked === false &&
        this.state.checkedAllDay === false)
    {
      document.getElementById("dash_holder_journal").style.display = "flex"
    }
    else if (document.getElementById("dash_holder_journal"))
    {
      document.getElementById("dash_holder_journal").style.display = "none"
    }

    if (event.target.checked === true)
    {
      document.getElementById("datetwo_journal").style.display = "inline-block"
    }
    else
    {
      document.getElementById("datetwo_journal").style.display = "none"
    }

    if (this.state.checkedAllDay === false || event.target.checked === true)
    {
      document.getElementById("to_space_journal").style.display = "inline-block"
    }
    else
    {
      document.getElementById("to_space_journal").style.display = "none"
    }
  };

  handleAllDay(event)
  {
    this.setState({ checkedAllDay: event.target.checked });

    // Reset the pickers...
    if (event.target.checked === true && this.state.checkedMultiDay === true)
    {
      this.setState({
        startTime: moment.unix(this.state.startDate).startOf('day').unix(),
        endTime: moment.unix(this.state.endDate).endOf('day').unix(),
      })
    }

    else if (event.target.checked === false && this.state.checkedMultiDay === false)
    {
      // Multi day is false, all day is false, reset times to selected day
      this.setState({
        startTime: moment.unix(this.state.startDate).startOf('day').unix(),
        endTime: moment.unix(this.state.startDate).endOf('day').unix(),
        endDate: moment.unix(this.state.startDate).startOf('day').unix(),
      })
    }
    else if (event.target.checked === false && this.state.checkedMultiDay === true)
    {
      // Multi day is true, all day is false, reset times to selected day
      this.setState({
        startTime: moment.unix(this.state.startDate).startOf('day').unix(),
        endTime: moment.unix(this.state.endDate).endOf('day').unix(),
      })
    }
    else if (event.target.checked === true && this.state.checkedMultiDay === false)
    {
      // Multi day is false, reset all
      this.setState({
        startDate: moment.unix(this.state.startDate).startOf('day').unix(),
        endDate: moment.unix(this.state.startDate).startOf('day').unix(),
        startTime: moment.unix(this.state.startDate).startOf('day').unix(),
        endTime: moment.unix(this.state.endDate).endOf('day').unix(),
      })
    }

    // UI handles

    if (event.target.checked === false &&
        this.state.checkedMultiDay === false)
    {
      document.getElementById("dash_holder_journal").style.display = "flex"
    }
    else if (document.getElementById("dash_holder_journal"))
    {
      document.getElementById("dash_holder_journal").style.display = "none"
    }


    if (event.target.checked === true)
    {
       var l = document.getElementsByClassName("time_pick_journal")
       for (var i = 0; i < l.length; i++)
       {
        l[i].style.display = "none"
       }
    }
    else
    {
      var l = document.getElementsByClassName("time_pick_journal")
      for (var i = 0; i < l.length; i++)
      {
       l[i].style.display = "inline-block"
      }
    }

    if (event.target.checked === false || this.state.checkedMultiDay === true)
    {
      document.getElementById("to_space_journal").style.display = "inline-block"
    }
    else
    {
      document.getElementById("to_space_journal").style.display = "none"
    }
  };


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
    if (res.multi_day === false && res.all_day === false)
    {
      document.getElementById("dash_holder_journal").style.display = "flex"
    }
    else if (document.getElementById("dash_holder_journal"))
    {
      document.getElementById("dash_holder_journal").style.display = "none"
    }


    var l = document.getElementsByClassName("time_pick_journal")

    if (res.multi_day === true && res.all_day === true)
    {
      if (document.getElementById("to_space_journal"))
      {
        document.getElementById("to_space_journal").style.display = "inline-block"
      }

      if (document.getElementById("datetwo_journal"))
      {
        document.getElementById("datetwo_journal").style.display = "inline-block"
      }

      var l = document.getElementsByClassName("time_pick_journal")
      for (var i = 0; i < l.length; i++)
      {
       l[i].style.display = "none"
      }
    }
    else if (res.multi_day === false && res.all_day === true)
    {
      if (document.getElementById("to_space_journal"))
      {
        document.getElementById("to_space_journal").style.display = "none"
      }

      if (document.getElementById("datetwo_journal"))
      {
        document.getElementById("datetwo_journal").style.display = "none"
      }

      for (var i = 0; i < l.length; i++)
      {
       l[i].style.display = "none"
      }
    }
    else if (res.multi_day === true && res.all_day === false)
    {
      if (document.getElementById("to_space_journal"))
      {
        document.getElementById("to_space_journal").style.display = "inline-block"
      }

      if (document.getElementById("datetwo_journal"))
      {
        document.getElementById("datetwo_journal").style.display = "inline-block"
      }

      for (var i = 0; i < l.length; i++)
      {
       l[i].style.display = "inline-block"
      }
    }
    else if (res.multi_day === false && res.all_day === false)
    {
      if (document.getElementById("to_space_journal"))
      {
        document.getElementById("to_space_journal").style.display = "inline-block"
      }

      if (document.getElementById("datetwo_journal"))
      {
        document.getElementById("datetwo_journal").style.display = "none"
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
    let allDay

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

    // verify date and times and valid
    if (verifyUnixInputs(this.state.startDate, endDate) === false)
    {
      startDateBeforeEndDate()
      return
    }

    if (verifyUnixInputs(this.state.startTime, endTime) === false)
    {
      startTimeBeforeEndTime()
      return
    }

    if (this.state.checkedMultiDay === true &&
        this.state.startDate === endDate)
    {
      sameDay()
      return
    }

    if (document.getElementById("bulletSelector_journal_modal").value === "")
    {
      missingTitle()
      return
    }

    if (endDate === moment.unix(this.state.startDate).startOf('day').unix() &&
        endTime === moment.unix(this.state.startDate).endOf('day').unix())
    {
      allDay = true
    }
    else
    {
      allDay = this.state.checkedAllDay
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
      all_day: allDay,
    }

    this.updateStoreEntry(parameters)
    .then((response) => {
      this.props.updateAllUIEntries()
    })
    .catch((error) => {
      console.log(error);
    });

    // Update DB
    axios.post(`${process.env.REACT_APP_DAISY_JOURNAL_API_URI}/api/update_entry`, {
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
        all_day: allDay,
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
        classes={{
          paper: this.props.classes.dialog_root
        }}
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
          <div className={this.props.classes.nav_list}>
            <div className={this.props.classes.list_item}>
              <div className={this.props.classes.selector}>
                <FormControl>
                  <Select
                    value={this.state.selected}
                    onChange={(e) => this.selectorChangeWithStatus(e)}
                    disableUnderline={true}
                    className={this.props.classes.dropdown}
                  >
                  <MenuItem value="checkboxBlankOutline">
                    <img src={checkboxBlankOutline} svgStyle={{ height: '20px' }}/>
                  </MenuItem>
                  <MenuItem value="checkboxBlank">
                    <img src={checkboxBlank} svgStyle={{ height: '20px' }}/>
                  </MenuItem>
                  <MenuItem value="checkboxBlankCircleOutline">
                    <img src={checkboxBlankCircleOutline} svgStyle={{ height: '20px' }}/>
                  </MenuItem>
                  <MenuItem value="checkboxBlankCircle">
                    <img src={checkboxBlankCircle} svgStyle={{ height: '20px' }}/>
                  </MenuItem>
                  <MenuItem value="checkboxBlankTriangleOutline">
                    <img src={checkboxBlankTriangleOutline} svgStyle={{ height: '20px' }}/>
                  </MenuItem>
                  <MenuItem value="checkboxBlankTriangle">
                    <img src={checkboxBlankTriangle} svgStyle={{ height: '20px' }}/>
                  </MenuItem>
                  <MenuItem value="minus">
                    <img src={minus} svgStyle={{ height: '20px' }}/>
                  </MenuItem>
                  </Select>
                </FormControl>
                <div className={this.props.classes.formStyle}>
                   <input
                   id="bulletSelector_journal_modal"
                   defaultValue={this.state.title}
                   className={this.props.classes.text_input}
                   onBlur={this.blurHandler}  />
                </div>
              </div>
            </div>
            <div className={this.props.classes.dates_times_container_journal}>
              <div className={this.props.classes.datetime_one}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                      id="dateone_journal"
                      format="MM / DD / YYYY"
                      InputProps={{
                      classes: {
                          input: this.props.classes.selector_datepicker_style,
                        }
                      }}
                      value={moment.unix(this.state.startDate).format('YYYY-MM-DD')}
                      onChange={(e) => this.dateChange(e, "start")}/>
                </MuiPickersUtilsProvider>

                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <TimePicker
                      id="timeone_journal"
                      class="time_pick_journal"
                      value={moment.unix(this.state.startTime)}
                      onChange={(e) => this.timeChange(e, "start")}
                      InputProps={{
                      classes: {
                          input: this.props.classes.selector_timepicker_style,
                        }
                      }}/>
                </MuiPickersUtilsProvider>

                <div id="to_space_journal">
                  <Typography component={'span'} variant="body1">to</Typography>
                </div>
              </div>
              <div className={this.props.classes.datetime_two}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                      id="datetwo_journal"
                      format="MM / DD / YYYY"
                      InputProps={{
                      classes: {
                          input: this.props.classes.selector_datepicker_style,
                        }
                      }}
                      value={moment.unix(this.state.endDate).format('YYYY-MM-DD')}
                      onChange={(e) => this.dateChange(e, "end")}/>
                </MuiPickersUtilsProvider>

                <div className={this.props.classes.dash_wrapper}>
                  <div id="dash_holder_journal" className={this.props.classes.dash_style}>
                    <img src={minus} className={this.props.classes.dash}/>
                  </div>
                </div>

                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <TimePicker
                      id="timetwo_journal"
                      class="time_pick_journal"
                      className={this.props.classes.timeInput}
                      value={moment.unix(this.state.endTime)}
                      onChange={(e) => this.timeChange(e, "end")}
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
                  checked={this.state.checkedAllDay}
                  onChange={(e) => this.handleAllDay(e)} />
                <div className={this.props.classes.selector_text}>
                  <div>All day</div>
                </div>
                <Checkbox
                  className={this.props.classes.check}
                  iconStyle={{color: 'black'}}
                  checked={this.state.checkedMultiDay}
                  onChange={(e) => this.handleMultiDay(e)} />
                <div className={this.props.classes.selector_text}>
                  <div>Multi day</div>
                </div>
              </div>
            </div>
          </div>
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


JournalEdit.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    edit_entries_modal_status: state.edit_entries_modal_status,
    entries_modal_id: state.entries_modal_id
  }
}
export default connect(mapStateToProps)(withStyles(styles)(JournalEdit));
