import React from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@mdi/react'
import Paper from '@material-ui/core/Paper';
import { mdiCheck, mdiClose } from '@mdi/js'

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";
import { getStoreHabits, getStoreHabitEntries } from '../.././Actions/actions'

// functions
import { checkAuth } from '../.././Utils/checkauth'
import { getHabitEntries } from '../.././Utils/gethabitentries'
import { getHabits } from '../.././Utils/gethabits'
import { createHabit } from '../.././Utils/createhabit'
import { updateHabit } from '../.././Utils/updatehabit'
import { deleteHabit } from '../.././Utils/deletehabit'
import { logHabit } from '../.././Utils/loghabit'
import { renderLoggedHabits } from '../.././Utils/renderloggedhabits'
import { softUpdateHabitEntries } from '../.././Utils/softupdatehabitentries'

// Components
import InternalNavBar from '../.././Components/NavBar/InternalNavBar'
import HabitsTable from '../.././Components/Habits/HabitsTable.js'
import NewHabit from '../.././Components/Modal/NewHabit'
import EditHabit from '../.././Components/Modal/EditHabit'

const methods = {};

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '80vw',
    minHeight: '80vh',
    maxWidth: '100vw',
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
});

class Habits extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      count: 0,
      firstDayOfWeekDate: moment().startOf('week').format('YYYY-MM-DD'),
      edit_id: "",
      newModalState: false,
      editModalState: false,
      editValue: "",
      newValue: "",
      habits: this.props.habits.habits,
      habit_entries: this.props.habit_entries.habit_entries,
    };

    checkAuth()

    this.handleModalOpen = this.handleModalOpen.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
    this.editModalValue = this.editModalValue.bind(this)
    this.newModalValue = this.newModalValue.bind(this)
    this.prevWeekHandler = this.prevWeekHandler.bind(this)
    this.nextWeekHandler = this.nextWeekHandler.bind(this)

    this.createHabit = createHabit.bind(this)
    this.deleteHabit = deleteHabit.bind(this)
    this.logHabit = logHabit.bind(this)
    this.updateHabit = updateHabit.bind(this)
    this.getHabits = getHabits.bind(this)
    this.getHabitEntries = getHabitEntries.bind(this)
    this.renderLoggedHabits = renderLoggedHabits.bind(this)
    this.softUpdateHabitEntries = softUpdateHabitEntries.bind(this)
  }

  componentDidMount()
  {
    // Initial renderHabits call will check all entries in redux store
    // Additional call in getHabitEntries will catch if the user toggles between routes quickly
    this.renderLoggedHabits()
    this.getHabitEntries()
  }

  componentWillUnmount()
  {
    this.getHabits()
    this.getHabitEntries()
  }

  prevWeekHandler() {
    this.setState({
      firstDayOfWeekDate: moment(this.state.firstDayOfWeekDate).subtract(1, "weeks").format('YYYY-MM-DD'),
    })

    this.getHabitEntries()
  }

  nextWeekHandler() {
    this.setState({
      firstDayOfWeekDate: moment(this.state.firstDayOfWeekDate).add(1, "weeks").format('YYYY-MM-DD'),
    })

    this.getHabitEntries()
  }

   editModalValue(event)
   {
     this.setState({
       editValue: event.target.value
     })
   }

   newModalValue(event)
   {
     this.setState({
       newValue: event.target.value
     })
   }

  handleModalOpen(modal, habit_id, title)
  {
    if (modal === 'new')
    {
      this.setState({
        newModalState: true,
      });
    }
    else if (modal === 'edit')
    {
      this.setState({
        editModalState: true,
        edit_id: habit_id,
        editValue: title,
      });
    }
  }

  handleModalClose()
  {
    this.setState({
      newModalState: false,
      editModalState: false,
    });
  }

  render() {
    if (store.getState().auth_status.auth_status === false) {
      return <Redirect to='/' />
    }

    return(
      <div>
        <InternalNavBar />
        <Paper className={this.props.classes.root}>
          <NewHabit
              newModalState={this.state.newModalState}
              handleModalClose={this.handleModalClose}
              createHabit={this.createHabit}
              newModalValue={this.newModalValue} />
          <EditHabit
              editModalState={this.state.editModalState}
              editValue={this.state.editValue}
              handleModalClose={this.handleModalClose}
              deleteHabit={this.deleteHabit}
              updateHabit={this.updateHabit}
              editModalValue={this.editModalValue} />
          <HabitsTable
              habits={this.state.habits}
              habit_entries={this.state.habit_entries}
              firstDayOfWeekDate={this.state.firstDayOfWeekDate}
              getHabits={this.getHabits}
              getHabitEntries={this.getHabitEntries}
              handleModalOpen={this.handleModalOpen}
              logHabit={this.logHabit}
              softUpdateHabitEntries={this.softUpdateHabitEntries}
              prevWeekHandler={this.prevWeekHandler}
              nextWeekHandler={this.nextWeekHandler} />
          </Paper>
      </div>
    );
  }
}

Habits.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth_status: state.auth_status,
    current_user: state.current_user,
    habits: state.habits,
    habit_entries: state.habit_entries,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Habits));
