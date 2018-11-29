import axios from 'axios';

export function  createHabit()
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
