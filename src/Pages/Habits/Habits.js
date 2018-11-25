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

// functions
import { checkAuth } from '../.././Utils/checkauth'

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
    maxWidth: '100vw',
    marginTop: '80px',
    marginBottom: '20px',
    marginLeft: '20px',
    marginRight: '20px',

    [theme.breakpoints.down(768)]: {
      marginLeft: '10px',
      marginRight: '10px',
    },
  },
});

class Habits extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      firstDayOfWeekDate: moment().startOf('week').format('YYYY-MM-DD'),
      edit_id: "",
      newModalState: false,
      editModalState: false,
      editValue: "",
      newValue: "",
      habits: [],
      habit_entries: [],
    };

    checkAuth()

    this.getHabits = this.getHabits.bind(this)
    this.createHabit = this.createHabit.bind(this)
    this.deleteHabit = this.deleteHabit.bind(this)
    this.handleModalOpen = this.handleModalOpen.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
    this.editModalValue = this.editModalValue.bind(this)
    this.newModalValue = this.newModalValue.bind(this)
    this.toggleIcon = this.toggleIcon.bind(this)
    this.getHabitEntries = this.getHabitEntries.bind(this)
    this.updateHabit = this.updateHabit.bind(this)
    this.prevWeekHandler = this.prevWeekHandler.bind(this)
    this.nextWeekHandler = this.nextWeekHandler.bind(this)

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

  getHabitEntries()
  {

    axios.post('http://127.0.0.1:5002/api/return_entries', {
      params: {
        user: sessionStorage.getItem('user'),
      }
    })
    .then((response) => {
      var res = response.data.entries
      var new_entries = []
      res.forEach(entry => {
        if (entry.type === 'habit')
        {
          new_entries.push(entry)
        }
      })

      this.setState({
        habit_entries: new_entries,
      })

      new_entries.forEach(entry =>
      {
        var id = entry.habit_id+"_"+moment.unix(entry.start_date).format('YYYY-MM-DD')
        if (document.getElementById(id))
        {
          if (entry.status === "1")
          {
            var cell = document.getElementById("cell"+id)
            var svg = cell.firstChild
            svg.firstChild.setAttribute("d",mdiCheck)
          }
        }
        if (document.getElementById(id))
        {
          if (entry.status === "0")
          {
            var cell = document.getElementById("cell"+id)
            var svg = cell.firstChild
            svg.firstChild.setAttribute("d",mdiClose)
          }
        }
      })

    })
    .catch((error)=>{
      console.log(error);
    });
  }

  getHabits()
  {
    axios.post('http://127.0.0.1:5002/api/return_habit_names', {
      params: {
        user: sessionStorage.getItem('user'),
      }
    })
    .then((response) => {
      var res = response.data.habits
      var habs = []
      res.forEach(habit => {
        habs.push(habit)
      })

      this.setState({
        habits: habs
      })
    })
  }

  createHabit()
  {
    axios.post('http://127.0.0.1:5002/api/save_habit', {
      params: {
        user: sessionStorage.getItem('user'),
        title: this.state.newValue
      }
    })
    .then((response) => {
      if (response.data.success === true)
      {
        this.handleModalClose()
        this.getHabits()
      }
      else
      {
        console.log("err")
      }
    })
  }

  updateHabit()
  {
    axios.post('http://127.0.0.1:5002/api/update_habit', {
      params: {
        habit_id: this.state.edit_id,
        new_title: this.state.editValue,
      }
    })
    .then((response) => {
      console.log(response)
      this.handleModalClose()

      document.getElementById(`title${this.state.edit_id}`).innerHTML = String(this.state.editValue)
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  deleteHabit()
  {
    axios.post('http://127.0.0.1:5002/api/remove_habit', {
      params: {
        habit_id: this.state.edit_id
      }
    })
    .then((response) => {
      console.log(response)
      this.handleModalClose()
      this.getHabits()
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  toggleIcon(id)
  {
    var s = id.split("_")
    var habit_id = s[0]
    var date = moment(s[1], "YYYY/MM/DD").unix()
    var starttime = moment(s[1], "YYYY/MM/DD").startOf('day').unix()
    var endtime = moment(s[1], "YYYY/MM/DD").endOf('day').unix()

    axios.post('http://127.0.0.1:5002/api/log_habit', {
      params: {
        user: sessionStorage.getItem('user'),
        habit_id: habit_id,
        type: 'habit',
        start_date: date,
        end_date: date,
        start_time: starttime,
        end_time: endtime,
        multi_day: false
      }
    })
    .then((response) => {
      this.getHabitEntries()
    })
    .catch((error)=>{
      console.log(error);
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
              toggleIcon={this.toggleIcon}
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
    current_user: state.current_user
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Habits));
