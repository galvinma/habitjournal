import axios from 'axios';

export function  createHabit()
  {
    axios.post(`${process.env.REACT_APP_DAISY_JOURNAL_API_URI}/api/save_habit`, {
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
