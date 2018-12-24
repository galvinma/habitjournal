import React from 'react'
import { Redirect } from 'react-router-dom';
import history from '../.././history';
import axios from 'axios';
import moment from 'moment'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Icon from '@mdi/react'
import Paper from '@material-ui/core/Paper';
import MediaQuery from 'react-responsive';

// Components
import InternalNavBar from '../.././Components/NavBar/InternalNavBar'
import Navs from '../.././Components/Calendar/Navs'
import CalendarHeader from '../.././Components/Calendar/CalendarHeader'
import CalendarBody from '../.././Components/Calendar/CalendarBody'
import CalendarEntries from '../.././Components/Modal/CalendarEntries'
import JournalEdit from '../.././Components/Modal/JournalEdit'
import SnackBar from '../.././Components/SnackBar/SnackBar'

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
import { emptyObject } from '../.././Utils/empty_object'
import { updateCalendarEntries } from '../.././Utils/updatecalendarentries'

  // Additional Page Prep
  import { getHabitEntries } from '../.././Utils/gethabitentries'
  import { renderLoggedHabits } from '../.././Utils/renderloggedhabits'
  import { getBullets} from '../.././Utils/getbullets'
  import { removeEntry} from '../.././Utils/removeentry'
  import { getHabits } from '../.././Utils/gethabits'

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";
import { getEntriesModalState, getEntriesModalID, getEditEntriesModalState, getCurrentEntry } from '../.././Actions/actions'

// CSS
import './Calendar.css'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '20px',
    marginRight: '20px',
    height: 'calc(100vh - 132px)',

    [theme.breakpoints.down(768)]: {
      marginLeft: '8px',
      marginRight: '8px',
      marginTop: '8px',
      height: 'calc(100vh - 96px)'
    },
  },
  typo_width: {
    width: '12.8vw',
    height: '16.5%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flexStart'
  },
  calendar_list: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    listStyle: 'none',
    paddingTop: '0px',
    paddingBottom: '0px',
    marginTop: '0px',
    marginBottom: '0px',
    marginLeft: '2px',
    marginRight: '2px',
    height: '100%',
  },
  list_footer_container: {
    marginTop: 'auto',
    position: 'relative',
    clear: 'both',
    width: '100%',
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
    this.convertToIcon = convertToIcon.bind(this)
    this.updateStoreEntryId = updateStoreEntryId.bind(this)
    this.updateStoreEntry = updateStoreEntry.bind(this)
    this.updateAllEntries = updateAllEntries.bind(this)
    this.updateCalendarEntries = updateCalendarEntries.bind(this)

    // Other
    this.getBullets = getBullets.bind(this)
    this.getHabitEntries = getHabitEntries.bind(this)
    this.renderLoggedHabits = renderLoggedHabits.bind(this)
    this.removeEntry = removeEntry.bind(this)
    this.getHabits = getHabits.bind(this)

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
    if (store.getState().first_load.first_load === true)
    {
      this.updateCalendarEntries()
      .then(() => {
        this.getHabitEntries()
        this.getBullets()
        this.getHabits()
      })
    }
    else
    {
      this.updateAllUIEntries()

      // Retry. Prevents users from having a black calendar if API call hasn't returned in time
      if (emptyObject(store.getState().calendar_entries.calendar_entries) === true)
      {
        let retry_count = 0
        var retry = (retry_count) =>
        {
          if (retry_count < 5 && emptyObject(store.getState().calendar_entries.calendar_entries) === true)
          {
            setTimeout(() =>
            {
                this.updateAllUIEntries()
                retry_count++
                retry(retry_count)
              }, 1000);
          }
        }
        retry(retry_count)
      }
    }
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
    if (store.getState().auth_status.auth_status === false)
    {
      checkAuth()
      .then(function(){
          if (store.getState().auth_status.auth_status === false)
          {
            history.push('/');
          }
      })
      .catch(function(error)
      {
        history.push('/');
      })
    }

    return(
      <div>
        <InternalNavBar />
        <Paper className={this.props.classes.root}>
          <JournalEdit
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
        <SnackBar/>
      </div>
    );
  }
}

Calendar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    all_entries: state.all_entries,
    calendar_entries: state.calendar_entries,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Calendar));
