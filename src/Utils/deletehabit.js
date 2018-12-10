import axios from 'axios';

export function deleteHabit()
  {
    axios.post('https://daisyjournal.com/api/remove_habit', {
      params: {
        habit_id: this.state.edit_id
      }
    })
    .then((response) => {
      this.handleModalClose()
      this.getHabits()
    })
    .catch((error)=>{
      console.log(error);
    });
  }
