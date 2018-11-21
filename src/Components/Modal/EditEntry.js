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
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
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
      reference: moment().startOf('day').unix(),
      entry: null,
      selected: "",
      type: "",
      start_date: moment().startOf('day').unix(),
      end_date: moment().endOf('day').unix(),
      start_time: moment().startOf('day').unix(),
      end_time: moment().endOf('day').unix(),
      title: "",
      status: "",
      multi_day: null,
      checkedAllDay: false,
      checkedMultiDay: false,
    }

    this.getMatch = this.getMatch.bind(this)
    this.convertToIconStringNoMult = convertToIconStringNoMult.bind(this)
    this.selectorChange = this.selectorChange.bind(this)
    this.resetState = this.resetState.bind(this)
  }

  getMatch()
  {
    axios.post('http://127.0.0.1:5002/api/return_one', {
      params: {
        user: sessionStorage.getItem('user'),
        entry_id: store.getState().entries_modal_id.entries_modal_id
      }
    })
    .then((response) => {
      var res = response.data.entry


      if ((moment.unix(response.data.entry.start_time).startOf('day').unix() === moment.unix(response.data.entry.start_time).unix()) &&
          (moment.unix(response.data.entry.end_time).endOf('day').unix() === moment.unix(response.data.entry.end_time).unix()))
      {
        this.setState({
          checkedAllDay: true,
        })

        var l = document.getElementsByClassName("time_pick")
        for (var i = 0; i < l.length; i++)
        {
         l[i].style.display = "none"
        }
     }
     else
     {
        this.setState({
          checkedAllDay: false,
        })

        var l = document.getElementsByClassName("time_pick")
        for (var i = 0; i < l.length; i++)
        {
         l[i].style.display = "inline-block"
        }
      }

      if (response.data.entry.multi_day === true)
      {
        this.setState({
          checkedMultiDay: true,
        })

        document.getElementById("datetwo").style.display = "inline-block"
      }
      else
      {
        this.setState({
          checkedMultiDay: false,
        })

        document.getElementById("datetwo").style.display = "none"
      }

      if (this.state.checkedAllDay === false || this.state.checkedMultiDay === true)
      {
        document.getElementById("to_spacer").style.display = "inline-block"
      }
      else
      {
        document.getElementById("to_spacer").style.display = "none"
      }

      this.setState({
        entry: response.data.entry,
        selected: this.convertToIconStringNoMult(response.data.entry),
        type: response.data.entry.type,
        start_date: response.data.entry.start_date,
        end_date: response.data.entry.end_date,
        start_time: response.data.entry.start_time,
        end_time: response.data.entry.end_time,
        title: response.data.entry.title,
        status: response.data.entry.status,
        multi_day: response.data.entry.multi_day,
      })
    })

  }

  resetState()
  {
    this.setState({
      reference: moment().startOf('day').unix(),
      entry: null,
      selected: "",
      type: "",
      start_date: moment().startOf('day').unix(),
      end_date: moment().endOf('day').unix(),
      start_time: moment().startOf('day').unix(),
      end_time: moment().endOf('day').unix(),
      title: "",
      status: "",
      multi_day: null,
      checkedAllDay: true,
      checkedMultiDay: false,
    })
  }

  updateEntry()
  {
    axios.post('http://127.0.0.1:5002/api/update_entry', {
      params: {
        entry_id: store.getState().entries_modal_id.entries_modal_id,
        type: this.state.type,
        start_date: this.state.start_date,
        end_date: this.state.end_date,
        start_time: this.state.start_time,
        end_time: this.state.end_time,
        title: this.state.title,
        status: this.state.status,
        multi_day: this.state.multi_day,
        checkedAllDay: true,
        checkedMultiDay: false,
      }
    })
    .then((response) => {
      this.props.handleModalClose("edit")
    })
    .catch((error)=>{
      console.log(error);
    });

    this.getBullets()
  }

  selectorChange(event)
  {

    this.setState({
      selected: event.target.value }
    );

    if (event.target.value === 'checkboxBlankCircleOutline' || event.target.value === "checkboxMultipleBlankCircleOutline")
    {
      this.setState({
        type: 'event',
        status: '0',
      })
    }

    if (event.target.value === 'checkboxBlankCircle' || event.target.value === "checkboxMultipleBlankCircle")
    {
      this.setState({
        type: 'event',
        status: '1',
      })
    }

    if (event.target.value === 'checkboxBlankOutline' || event.target.value === "checkboxMultipleBlankOutline")
    {
      this.setState({
        type: 'task',
        status: '0',
      })
    }

    if (event.target.value === 'checkboxBlank' || event.target.value === "checkboxMultipleBlank")
    {
      this.setState({
        type: 'task',
        status: '1',
      })
    }

    if (event.target.value === 'checkboxBlankTriangleOutline' || event.target.value === "checkboxMultipleBlankTriangleOutline")
    {
      this.setState({
        type: 'appointment',
        status: '0',
      })
    }

    if (event.target.value === 'checkboxBlankTriangle' || event.target.value === "checkboxMultipleBlankTriangle")
    {
      this.setState({
        type: 'appointment',
        status: '1',
      })
    }

  };

  titleChange(event)
  {
    this.setState({
      title: event.target.value
    });
  };

  dateChange(event, state)
  {
    if (state === 'start')
    {
      this.setState({
        start_date: moment(event).unix()
      })
    }
    else if (state === 'end')
    {
      this.setState({
        end_date: moment(event).unix()
      })
    }
  }

  timeChange(event, state)
  {
    if (state === 'start')
    {
      var delta = moment(event).unix() - this.state.reference
      var utc = moment.unix(this.state.start_date).startOf('day').unix() + delta
      this.setState({
        start_time: moment.unix(utc).unix()
      })
    }
    else if (state === 'end')
    {
      var delta = moment(event).unix() - this.state.reference
      var utc = moment.unix(this.state.end_date).startOf('day').unix() + delta
      this.setState({
        end_time: moment.unix(utc).unix()
      })
    }
  }

  handleMultiDay(event)
  {
    if (event.target.checked === true)
    {
      document.getElementById("datetwo").style.display = "inline-block"
    }
    else
    {
      document.getElementById("datetwo").style.display = "none"
    }

    this.setState({ checkedMultiDay: event.target.checked });

    if (this.state.checkedAllDay === false || event.target.checked === true)
    {
      document.getElementById("to_spacer").style.display = "inline-block"
    }
    else
    {
      document.getElementById("to_spacer").style.display = "none"
    }
  };

  handleAllDay(event)
  {
    if (event.target.checked === true)
    {
       var l = document.getElementsByClassName("time_pick")
       for (var i = 0; i < l.length; i++)
       {
        l[i].style.display = "none"

        // this.setState({
        //   start_date: moment().unix(),
        //   end_date: moment().unix(),
        //   start_time: moment().startOf('day').unix(),
        //   end_time: moment().endOf('day').unix(),
        // })
       }
    }
    else
    {
      var l = document.getElementsByClassName("time_pick")
      for (var i = 0; i < l.length; i++)
      {
       l[i].style.display = "inline-block"
      }
    }

    this.setState({ checkedAllDay: event.target.checked });

    if (event.target.checked === false || this.state.checkedMultiDay === true)
    {
      document.getElementById("to_spacer").style.display = "inline-block"
    }
    else
    {
      document.getElementById("to_spacer").style.display = "none"
    }
  };

  deleteEntry(id)
  {
    axios.post('http://127.0.0.1:5002/api/remove_entry', {
      params: {
        entry_id: id
      }
    })
    .then((response) => {
      this.props.handleModalClose("edit")
    })
    .catch((error)=>{
      console.log(error);
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
        onExit={this.resetState}
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
                      onChange={(e) => this.selectorChange(e)}
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
                     onChange={(e) => this.titleChange(e)} />
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
                        value={moment.unix(this.state.start_date).format('YYYY-MM-DD')}
                        onChange={(e) => this.dateChange(e, "start")}/>
                  </MuiPickersUtilsProvider>
                </Typography>
                <Typography variant="body1">
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                      <TimePicker
                        id="timeone"
                        class="time_pick"
                        value={moment.unix(this.state.start_time)}
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
                        value={moment.unix(this.state.end_date).format('YYYY-MM-DD')}
                        onChange={(e) => this.dateChange(e, "end")}/>
                  </MuiPickersUtilsProvider>
                </Typography>
                <Typography variant="body1">
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                      <TimePicker
                        id="timetwo"
                        class="time_pick"
                        className={this.props.classes.timeInput}
                        value={moment.unix(this.state.end_time)}
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
            <Button onClick={this.deleteEntry} color="primary">
              <Typography variant="body1">Delete</Typography>
            </Button>
            <Button onClick={() => this.props.handleModalClose("edit")} color="primary">
              <Typography variant="body1">Cancel</Typography>
            </Button>
            <Button onClick={this.props.updateHabit} color="primary">
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
