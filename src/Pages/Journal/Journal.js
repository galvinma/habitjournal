import React from 'react'
import axios from 'axios';
import moment from 'moment'
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

// Components
import InternalNavBar from '../.././Components/NavBar/InternalNavBar'
import BulletList from '../.././Components/BulletList/BulletList'
import BulletSelector from '../.././Components/BulletList/BulletSelector'
import BulletNavigator from '../.././Components/BulletList/BulletNavigator'
import Key from '../.././Components/BulletList/Key'
import JournalTabs from '../.././Components/Tabs/JournalTabs'

// Functions
import { checkAuth } from '../.././Utils/checkauth'
import { updateAllEntries } from '../.././Utils/updateallentries'
import { returnAllDatabaseEntries } from '../.././Utils/returnalldatabaseentries'
import { sortBulletObject } from '../.././Utils/sortbullets'
import { dateChange } from '../.././Utils/datechange'
import { timeChange } from '../.././Utils/timechange'
import { handleMultiDay } from '../.././Utils/handlemultiday'
import { handleAllDay } from '../.././Utils/handleallday'
import { blurHandler } from '../.././Utils/blurhandler'
import { updateBulletTitle } from '../.././Utils/updatebullettitle'
import { updateBulletTimes } from '../.././Utils/updatebullettimes'
import { addBullet } from '../.././Utils/addbullet'
import { removeBullet} from '../.././Utils/removebullet'
import { getBullets } from '../.././Utils/getbullets'
import { selectorChange } from '../.././Utils/selectorchange'
import { checkSubmit } from '../.././Utils/checksubmit'
import { titleChange } from '../.././Utils/titlechange'
import { changeSelectedMonth } from '../.././Utils/changeselectedmonth'
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
    minWidth: '80vw',
    marginTop: '80px',
    marginBottom: '20px',
    marginLeft: '20px',
    marginRight: '20px',

    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      marginLeft: '8px',
      marginRight: '8px',
      marginTop: '64px',
    },
  },
  bullet_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    minWidth: '70vw',
    paddingLeft: '20px',
    paddingRight: '20px',

    [theme.breakpoints.down(768)]: {
      paddingLeft: '20px',
      paddingRight: '20px',
    },
  },
  month_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    height: '80vh',
    marginLeft: 'auto',
    width: '22.5vw',
    overflowY: 'auto',

    [theme.breakpoints.down(768)]: {
      minWidth: '90vw',
      order: '50',
      paddingLeft: '20px',
      paddingRight: '20px',
      height: 'auto',
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
});

class Journal extends React.Component {
  constructor(props){
  super(props);

  this.state = {
    bullets: store.getState().journal_entries.journal_entries,
    title: '',
    type: 'task',
    selected: 'mdiSquareOutline',
    selectedMonth: moment().format('MMMM, YYYY'),
    reference: moment().startOf('day').unix(),
    startDate: moment().startOf('day').unix(),
    endDate: moment().startOf('day').unix(),
    startTime: moment().startOf('day').unix(),
    endTime: moment().endOf('day').unix(),
    navigatorMonths: store.getState().nav_months.nav_months || [],
    checkedAllDay: true,
    checkedMultiDay: false,
  }

  checkAuth()

  this.changeSelectedMonth = changeSelectedMonth.bind(this)
  this.titleChange = titleChange.bind(this)
  this.removeBullet = removeBullet.bind(this)
  this.updateBulletTitle = updateBulletTitle.bind(this)
  this.checkSubmit = checkSubmit.bind(this)
  this.selectorChange = selectorChange.bind(this)
  this.updateBulletTimes = updateBulletTimes.bind(this)
  this.returnAllDatabaseEntries = returnAllDatabaseEntries.bind(this)
  this.updateAllEntries = updateAllEntries.bind(this)
  this.addBullet = addBullet.bind(this)
  this.getBullets = getBullets.bind(this)
  this.blurHandler = blurHandler.bind(this)
  this.timeChange = timeChange.bind(this)
  this.dateChange = dateChange.bind(this)
  this.handleAllDay = handleAllDay.bind(this)
  this.handleMultiDay = handleMultiDay.bind(this)

  // Other
  this.getHabits = getHabits.bind(this)
  this.getHabitEntries = getHabitEntries.bind(this)
  this.renderLoggedHabits = renderLoggedHabits.bind(this)
  this.getCalendarEntries = getCalendarEntries.bind(this)

  }

  componentDidMount()
  {
    if (store.getState().first_load.first_load === true)
    {
      this.updateAllEntries()

      store.dispatch(getFirstLoadStatus({
        first_load: false,
      }))
    }
    else
    {
      this.returnAllDatabaseEntries()
      .then((response) => {
          this.getBullets()
      })
      .catch((error)=>{
        console.log(error);
      });
    }

    this.getHabits()
  }

  shouldComponentUpdate(nextProps, nextState)
  {
    if (nextState.bullets !== this.state.bullets ||
        nextState.navigatorMonths !== this.state.navigatorMonths ||
        nextState.selected !== this.state.selected ||
        nextState.type !== this.state.type ||
        nextState.startDate !== this.state.startDate ||
        nextState.endDate !== this.state.endDate ||
        nextState.startTime !== this.state.startTime ||
        nextState.endTime !== this.state.endTime ||
        nextState.checkedMultiDay !== this.state.checkedMultiDay ||
        nextState.checkedAllDay !== this.state.checkedAllDay)
    {
      return true
    }
    else
    {
      return false
    }
  }

  render() {
    if (store.getState().auth_status.auth_status === false) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <InternalNavBar />
          <div className={this.props.classes.journal_container}>
            <Paper className={this.props.classes.bullet_container}>
              <BulletSelector
                checkSubmit={this.checkSubmit}
                selectorChange={this.selectorChange}
                titleChange={this.titleChange}
                addBullet={this.addBullet}
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
              <BulletList
                bullets={this.state.bullets}
                removeBullet={this.removeBullet}
                toggleIcon={this.toggleIcon}
                getBullets={this.getBullets}
                blurHandler={this.blurHandler}
                updateBulletTitle={this.updateBulletTitle}
                updateBulletTimes={this.updateBulletTimes}
                updateAllEntries={this.updateAllEntries} />
            </Paper>
          <Paper className={this.props.classes.month_container}>
            <JournalTabs
              navigatorMonths={this.state.navigatorMonths}
              changeSelectedMonth={this.changeSelectedMonth}/>
          </Paper>
        </div>
      </div>
    );
  }
}

Journal.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth_status: state.auth_status,
    current_user: state.current_user,
    all_entries: state.all_entries,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Journal));
