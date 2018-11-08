import React from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@mdi/react'
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
    marginTop: '70px',
    minWidth: '80vw',
    maxWidth: '100vw',
    marginLeft: '50px',
    marginRight: '50px',

    [theme.breakpoints.down(768)]: {
      marginLeft: '15px',
      marginRight: '15px',
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
      editModalValue: "",
      newModalValue: "",
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

    this.getHabits()
    this.getHabitEntries()

  }

   editModalValue(event)
   {
     this.setState({
       editModalValue: event.target.value
     })
   }

   newModalValue(event)
   {
     this.setState({
       newModalValue: event.target.value
     })
   }

  handleModalOpen(modal, habit_id)
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
        edit_id: habit_id
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
        new_entries.push(entry)
      })

      this.setState({
        habit_entries: new_entries,
      })

      new_entries.forEach(entry =>
      {
        var id = entry.habit_id+"_"+moment.unix(entry.date).format('YYYY-MM-DD')
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
        title: this.state.newModalValue
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

  deleteHabit()
  {
    axios.post('http://127.0.0.1:5002/api/remove_habit', {
      params: {
        habit_id: this.state.edit_id
      }
    })
    .then((response) => {
      console.log(response)
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
    axios.post('http://127.0.0.1:5002/api/log_habit', {
      params: {
        user: sessionStorage.getItem('user'),
        habit_id: habit_id,
        type: 'habit',
        date: date,
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
        <div className={this.props.classes.root}>
          <NewHabit
              newModalState={this.state.newModalState}
              handleModalClose={this.handleModalClose}
              createHabit={this.createHabit}
              newModalValue={this.newModalValue} />
          <EditHabit
              editModalState={this.state.editModalState}
              handleModalClose={this.handleModalClose}
              deleteHabit={this.deleteHabit}
              editModalValue={this.editModalValue} />
          <HabitsTable
              habits={this.state.habits}
              habit_entries={this.state.habit_entries}
              firstDayOfWeekDate={this.state.firstDayOfWeekDate}
              getHabits={this.getHabits}
              getHabitEntries={this.getHabitEntries}
              handleModalOpen={this.handleModalOpen}
              toggleIcon={this.toggleIcon} />
          </div>
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
