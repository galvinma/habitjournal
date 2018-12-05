import React from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Icon from '@mdi/react'
import Paper from '@material-ui/core/Paper';
import MediaQuery from 'react-responsive';
import {  mdiSquare,
          mdiSquareOutline,
          mdiCircle,
          mdiCircleOutline,
          mdiTriangle,
          mdiTriangleOutline,
          mdiMinus,
          mdiClose,
          mdiFlowerOutline,
          mdiDotsHorizontal,
        } from '@mdi/js'

// Components
import InternalNavBar from '../.././Components/NavBar/InternalNavBar'
import Navs from '../.././Components/Calendar/Navs'
import CalendarHeader from '../.././Components/Calendar/CalendarHeader'
import CalendarBody from '../.././Components/Calendar/CalendarBody'
import CalendarEntries from '../.././Components/Modal/CalendarEntries'
import EditEntry from '../.././Components/Modal/EditEntry'

// functions
import { checkAuth } from '../.././Utils/checkauth'
import { convertToIcon } from '../.././Utils/convertoicon'
import { toggleIcon } from '../.././Utils/toggleicon'
import { updateAllUIEntries } from '../.././Utils/updatealluientries'
import { returnAllDatabaseEntries } from '../.././Utils/returnalldatabaseentries'
import { removeOldCalendarEntries } from '../.././Utils/removeoldcalendarentries'
import { getCalendarEntries } from '../.././Utils/getcalendarentries'
import { updateCalendarBody } from '../.././Utils/updatecalendarbody'
import { updateStoreEntryId } from '../.././Utils/updatestoreentryid'
import { updateStoreEntry } from '../.././Utils/updatestoreentry'
import { updateAllEntries } from '../.././Utils/updateallentries'

  // Additional Page Prep
  import { getHabitEntries } from '../.././Utils/gethabitentries'
  import { renderLoggedHabits } from '../.././Utils/renderloggedhabits'
  import { getBullets} from '../.././Utils/getbullets'
  import { removeEntry} from '../.././Utils/removeentry'

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";
import { getEntriesModalState, getEntriesModalID, getEditEntriesModalState, getCurrentEntry } from '../.././Actions/actions'

// CSS
import './Calendar.css'

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
    alignItems: 'center',
    marginTop: '80px',
    marginBottom: '20px',
    marginLeft: '20px',
    marginRight: '20px',

    [theme.breakpoints.down(768)]: {
      marginLeft: '8px',
      marginRight: '8px',
      marginTop: '64px',
    },
  },
  typo_width: {
    width: '12.8vw',
  },
  calendar_list: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    height: '10vh',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    listStyle: 'none',
    paddingTop: '0px',
    paddingBottom: '0px',
    marginTop: '0px',
    marginBottom: '0px',
    marginLeft: '2px',
    marginRight: '2px',
  },
  list_footer_container: {
    height: '1em',
    position: 'relative',
    height: '1em',
    clear: 'both',
    width: '100%',
    paddingBottom: '5px',
  },
  calendar_header_names: {
    flexGrow: 1,
    textAlign: 'left',
    width: '12.8vw',
    maxWidth: '12.8vw',
  },
  hidden: {
    visibility: "hidden",
  },

});

class Calendar extends React.Component {
  constructor(props)
  {
    super(props);

    checkAuth()

    this.state = {
      calendar_entries: store.getState().calendar_entries.calendar_entries,
      selectedMonth: moment().month(),
      firstDayOfMonthDate: moment().startOf('month').format('YYYY-MM-DD'),
      displayMonthYear: moment().format('MMMM YYYY'),
      daysInMonth: moment().daysInMonth(),
      showEntriesModalState: false,
      edit_id: "",
      editModalState: false,
    };

    this.prevMonthHandler = this.prevMonthHandler.bind(this)
    this.nextMonthHandler = this.nextMonthHandler.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)

    this.updateAllUIEntries = updateAllUIEntries.bind(this)
    this.returnAllDatabaseEntries = returnAllDatabaseEntries.bind(this)
    this.updateCalendarBody = updateCalendarBody.bind(this)
    this.removeOldCalendarEntries = removeOldCalendarEntries.bind(this)
    this.getCalendarEntries = getCalendarEntries.bind(this)
    this.toggleIcon = toggleIcon.bind(this)
    this.updateStoreEntryId = updateStoreEntryId.bind(this)
    this.updateStoreEntry = updateStoreEntry.bind(this)
    this.updateAllEntries = updateAllEntries.bind(this)

    // Other
    this.getBullets = getBullets.bind(this)
    this.getHabitEntries = getHabitEntries.bind(this)
    this.renderLoggedHabits = renderLoggedHabits.bind(this)
    this.removeEntry = removeEntry.bind(this)

  }

  shouldComponentUpdate(nextProps, nextState) {
   if (nextState.selectedMonth !== this.state.selectedMonth ||
       nextState.firstDayOfMonthDate !== this.state.firstDayOfMonthDate ||
       nextState.displayMonthYear !== this.state.displayMonthYear ||
       nextState.daysInMonth !== this.state.daysInMonth ||
       nextState.calendar_entries !== this.state.calendar_entries)
   {
     return true
   }
   else
   {
     return false
   }
 }

  componentDidMount() {
    this.updateAllUIEntries()
  }

  handleModalClose(mode)
  {
    if (mode === "view")
    {
      store.dispatch(getEntriesModalState({
        entries_modal_status: false
      }))
    }

    if (mode === "edit")
    {
      store.dispatch(getEditEntriesModalState({
        edit_entries_modal_status: false
      }))
    }
  }

  prevMonthHandler() {

    this.removeOldCalendarEntries()

    this.setState({
      selectedMonth: this.state.selectedMonth - 1,
      firstDayOfMonthDate: moment(this.state.firstDayOfMonthDate).subtract(1, 'months').format('YYYY-MM-DD'),
      displayMonthYear: moment(this.state.firstDayOfMonthDate).subtract(1, 'months').format('MMMM YYYY'),
      daysInMonth: moment(this.state.firstDayOfMonthDate).subtract(1, 'months').daysInMonth(),
    }, () => {
      this.updateCalendarBody()
      this.getCalendarEntries()
    })
  }

  nextMonthHandler() {

    this.removeOldCalendarEntries()

    this.setState({
      selectedMonth: this.state.selectedMonth + 1,
      firstDayOfMonthDate: moment(this.state.firstDayOfMonthDate).add(1, 'months').format('YYYY-MM-DD'),
      displayMonthYear: moment(this.state.firstDayOfMonthDate).add(1, 'months').format('MMMM YYYY'),
      daysInMonth: moment(this.state.firstDayOfMonthDate).add(1, 'months').daysInMonth(),
    }, () => {
      this.updateCalendarBody()
      this.getCalendarEntries()
    })
  }

  render() {
    if (store.getState().auth_status.auth_status === false) {
      return <Redirect to='/' />
    }

    return(
      <div>
        <InternalNavBar />
        <Paper className={this.props.classes.root}>
          <EditEntry
              handleModalOpen={this.handleModalOpen}
              handleModalClose={this.handleModalClose}
              getCalendarEntries={this.getCalendarEntries}
              removeOldCalendarEntries={this.removeOldCalendarEntries}
              removeEntry={this.removeEntry}
              updateAllUIEntries={this.updateAllUIEntries} />
          <CalendarEntries
              handleModalOpen={this.handleModalOpen}
              handleModalClose={this.handleModalClose}
              calendar_entries={this.state.calendar_entries} />
          <Navs
              prevMonthHandler = {this.prevMonthHandler}
              nextMonthHandler = {this.nextMonthHandler}
              displayMonthYear={this.state.displayMonthYear} />
          <CalendarHeader
              daysInMonth={this.state.daysInMonth}
              selectedMonth={this.state.selectedMonth}
              firstDayOfMonthDate={this.state.firstDayOfMonthDate}
              getCalendarEntries={this.getCalendarEntries}
              updateCalendarHeader={this.updateCalendarHeader}
              updateCalendarBody={this.updateCalendarBody} />
          <CalendarBody
              daysInMonth={this.state.daysInMonth}
              selectedMonth={this.state.selectedMonth}
              firstDayOfMonthDate={this.state.firstDayOfMonthDate}
              getCalendarEntries={this.getCalendarEntries}
              updateCalendarHeader={this.updateCalendarHeader}
              updateCalendarBody={this.updateCalendarBody} />
        </Paper>
      </div>
    );
  }
}

Calendar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth_status: state.auth_status,
    current_user: state.current_user,
    all_entries: state.all_entries,
    calendar_entries: state.calendar_entries,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Calendar));
