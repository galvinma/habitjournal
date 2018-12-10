import axios from 'axios';

// redux
import store from '.././Store/store'
import { connect } from "react-redux";
import { getStoreHabits } from '.././Actions/actions'

export function getHabits()
{
  axios.post('https://daisyjournal.com/api/return_habit_names', {
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
      habits: habs,
    })

    store.dispatch(getStoreHabits({
      habits: habs,
    }))

  })
}
