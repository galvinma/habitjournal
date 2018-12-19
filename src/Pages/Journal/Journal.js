import React from 'react'
import axios from 'axios';
import moment from 'moment'
import { Redirect } from 'react-router-dom';
import history from '../.././history';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

// Components
import InternalNavBar from '../.././Components/NavBar/InternalNavBar'
import BulletList from '../.././Components/BulletList/BulletList'
import BulletSelector from '../.././Components/BulletList/BulletSelector'
import BulletNavigator from '../.././Components/BulletList/BulletNavigator'
import Key from '../.././Components/Modal/Key'
import Archive from '../.././Components/Modal/Archive'
import JournalTabs from '../.././Components/Tabs/JournalTabs'
import SnackBar from '../.././Components/SnackBar/SnackBar'
import Loader from '../.././Components/Loaders/Loader'

// Functions
import { checkAuth } from '../.././Utils/checkauth'
import { updateStoreEntry } from '../.././Utils/updatestoreentry'
import { updateStoreEntryId } from '../.././Utils/updatestoreentryid'
import { updateAllEntries } from '../.././Utils/updateallentries'
import { updateAllUIEntries } from '../.././Utils/updatealluientries'
import { returnAllDatabaseEntries } from '../.././Utils/returnalldatabaseentries'
import { sortBulletObject } from '../.././Utils/sortbullets'
import { dateChange } from '../.././Utils/datechange'
import { timeChange } from '../.././Utils/timechange'
import { handleMultiDay } from '../.././Utils/handlemultiday'
import { handleAllDay } from '../.././Utils/handleallday'
import { updateBulletTitle } from '../.././Utils/updatebullettitle'
import { updateBulletTimes } from '../.././Utils/updatebullettimes'
import { addEntry } from '../.././Utils/addentry'
import { removeEntry} from '../.././Utils/removeentry'
import { getBullets } from '../.././Utils/getbullets'
import { selectorChange } from '../.././Utils/selectorchange'
import { checkSubmit } from '../.././Utils/checksubmit'
import { titleChange } from '../.././Utils/titlechange'
import { changeSelectedMonth } from '../.././Utils/changeselectedmonth'
import { toggleIcon } from '../.././Utils/toggleicon'
  // Additional Page Prep
  import { getHabitEntries } from '../.././Utils/gethabitentries'
  import { getHabits } from '../.././Utils/gethabits'
  import { renderLoggedHabits } from '../.././Utils/renderloggedhabits'
  import { getCalendarEntries } from '../.././Utils/getcalendarentries'

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";
import { getAllEntries, getNavMonths, getFirstLoadStatus } from '../.././Actions/actions'

// css
import './Journal.css'

const styles = theme => ({
  journal_container: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: 'calc(100vh - 132px)',
    minWidth: '80vw',
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '20px',
    marginRight: '20px',

    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      marginLeft: '8px',
      marginRight: '8px',
      marginTop: '8px',
    },
  },
  bullet_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    minWidth: 'calc(100vw - 360px)',
    paddingLeft: '20px',
    paddingRight: '20px',

    [theme.breakpoints.down(768)]: {
      paddingLeft: '8px',
      paddingRight: '8px',
    },
  },
  month_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    height: 'calc(100vh - 132px)',
    minHeight: '550px',
    marginLeft: 'auto',
    width: '250px',
    marginLeft: '20px',
    marginRight: '0px',

    [theme.breakpoints.down(768)]: {
      minWidth: '90vw',
      order: '50',
      paddingLeft: '20px',
      paddingRight: '20px',
      height: 'auto',
      display: 'none'
    },
  },
  key_container: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '20px',
    height: '90vh',
    minWidth: '20vw',
    maxWidth: '20vw',

    [theme.breakpoints.down(768)]: {
      height: '120px',
      minWidth: '90vw',
      marginTop: 'auto',
      order: '100',
      height: 'auto',
    },
  },
  loading: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '32px',
    marginBottom: '32px',
  }
});

class Journal extends React.Component {
  constructor(props){
  super(props);

  this.state = {
    title: '',
    type: 'task',
    selected: 'checkboxBlankOutline',
    selectedMonth: moment().format('MMMM, YYYY'),
    reference: moment().startOf('day').unix(),
    startDate: moment().startOf('day').unix(),
    endDate: moment().startOf('day').unix(),
    startTime: moment().startOf('day').unix(),
    endTime: moment().endOf('day').unix(),
    checkedAllDay: true,
    checkedMultiDay: false,
    IDCount: 0,
  }

  this.changeSelectedMonth = changeSelectedMonth.bind(this)
  this.titleChange = titleChange.bind(this)
  this.removeEntry = removeEntry.bind(this)
  this.updateBulletTitle = updateBulletTitle.bind(this)
  this.checkSubmit = checkSubmit.bind(this)
  this.selectorChange = selectorChange.bind(this)
  this.updateBulletTimes = updateBulletTimes.bind(this)
  this.addEntry = addEntry.bind(this)
  this.getBullets = getBullets.bind(this)
  this.timeChange = timeChange.bind(this)
  this.dateChange = dateChange.bind(this)
  this.handleAllDay = handleAllDay.bind(this)
  this.handleMultiDay = handleMultiDay.bind(this)
  this.updateStoreEntry = updateStoreEntry.bind(this)
  this.returnAllDatabaseEntries = returnAllDatabaseEntries.bind(this)
  this.updateAllEntries = updateAllEntries.bind(this)
  this.updateAllUIEntries = updateAllUIEntries.bind(this)
  this.toggleIcon = toggleIcon.bind(this)
  this.updateStoreEntryId = updateStoreEntryId.bind(this)

  // Other
  this.getHabits = getHabits.bind(this)
  this.getHabitEntries = getHabitEntries.bind(this)
  this.renderLoggedHabits = renderLoggedHabits.bind(this)
  this.getCalendarEntries = getCalendarEntries.bind(this)

  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.startDate !== this.state.startDate ||
        nextState.endDate !== this.state.endDate ||
        nextState.startTime !== this.state.startTime ||
        nextState.endTime !== this.state.endTime ||
        nextState.checkedAllDay !== this.state.checkedAllDay ||
        nextState.checkedMultiDay !== this.state.checkedMultiDay ||
        nextState.type !== this.state.type ||
        nextState.selected !== this.state.selected)
    {
     return true
    }
    else
    {
     return false
    }
  }

  componentDidMount()
  {
    if (store.getState().first_load.first_load === true)
    {
      this.updateAllEntries()
      this.getHabits()
    }
    else
    {
      this.updateAllUIEntries()
    }
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
    return (
      <div>
        <InternalNavBar />
        <Key />
        <Archive
          navigatorMonths={this.state.navigatorMonths}
          changeSelectedMonth={this.changeSelectedMonth} />
          <div className={this.props.classes.journal_container}>
            <Paper className={this.props.classes.bullet_container}>
              <BulletSelector
                checkSubmit={this.checkSubmit}
                selectorChange={this.selectorChange}
                titleChange={this.titleChange}
                addEntry={this.addEntry}
                dateChange={this.dateChange}
                timeChange={this.timeChange}
                handleAllDay={this.handleAllDay}
                handleMultiDay={this.handleMultiDay}
                selected={this.state.selected}
                title={this.state.title}
                type={this.state.type}
                bullets={this.state.bullets}
                selectedMonth={this.state.selectedMonth}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                startTime={this.state.startTime}
                endTime={this.state.endTime}
                checkedAllDay={this.state.checkedAllDay}
                checkedMultiDay={this.state.checkedMultiDay} />
              <Loader/>
              <BulletList
                icons={this.props.icons}
                bullets={this.state.bullets}
                removeEntry={this.removeEntry}
                toggleIcon={this.toggleIcon}
                getBullets={this.getBullets}
                updateBulletTitle={this.updateBulletTitle}
                updateBulletTimes={this.updateBulletTimes}
                updateAllEntries={this.updateAllEntries} />
            </Paper>
          <Paper className={this.props.classes.month_container}>
            <JournalTabs
              changeSelectedMonth={this.changeSelectedMonth}/>
          </Paper>
          <SnackBar/>
        </div>
      </div>
    );
  }
}

Journal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// const mapStateToProps = state => {
//   return {
//     loading_status: state.loading_status,
//   }
// }

export default (withStyles(styles)(Journal));
