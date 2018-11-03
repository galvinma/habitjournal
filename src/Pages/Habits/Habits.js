import React from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";

// functions
import { checkAuth } from '../.././Utils/checkauth'

// Components
import InternalNavBar from '../.././Components/NavBar/InternalNavBar'
import HabitsTable from '../.././Components/Habits/HabitsTable.js'
import NewHabit from '../.././Components/Modal/NewHabit'

const methods = {

};

const styles = theme => ({
  root: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
});

class Habits extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      firstDayOfWeekDate: moment().startOf('week').format('YYYY-MM-DD'),
      modalState: false,
      habits: []
    };

    checkAuth()

    this.getHabits = this.getHabits.bind(this)
    this.createHabit = this.createHabit.bind(this)
    this.handleModalOpen = this.handleModalOpen.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
    this.modalValue = this.modalValue.bind(this)
    this.toggleIcon = this.toggleIcon.bind(this)

    this.getHabits()
    this.getHabitEntries()
  }

   modalValue = (event) => {
     this.setState({
       modalValue: event.target.value
     });
   }

  handleModalOpen()
  {
    this.setState({
      modalState: true,
    });
  }

  handleModalClose()
  {
    this.setState({
      modalState: false,
    });
  }

  getHabitEntries()
  {

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
        habs.push(habit.name)
      })

      this.setState({
        habits: habs
      })
    })
  }

  createHabit()
  {
    axios.post('http://127.0.0.1:5002/api/create_habit', {
      params: {
        user: sessionStorage.getItem('user'),
        name: this.state.modalValue
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

  toggleIcon(id, date, status)
  {
    axios.post('http://127.0.0.1:5002/api/log_habit', {
      params: {
        habit_entry_id: id,
        date: date,
        status: status,
      }
    })
    .then((response) => {
      console.log(response)

    })
    .catch((error)=>{
      console.log(error);
    });

    this.getHabitEntries()
  }


  render() {
    if (store.getState().auth_status.auth_status === false) {
      return <Redirect to='/' />
    }
    return(
      <div>
        <InternalNavBar />
        <NewHabit
            modalState={this.state.modalState}
            handleModalClose={this.handleModalClose}
            createHabit={this.createHabit}
            modalValue={this.modalValue} />
        <HabitsTable
            habits={this.state.habits}
            firstDayOfWeekDate={this.state.firstDayOfWeekDate}
            getHabits={this.getHabits}
            handleModalOpen={this.handleModalOpen}
            toggleIcon={this.toggleIcon} />
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
