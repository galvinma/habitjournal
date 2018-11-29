import axios from 'axios';

export function deleteHabit()
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
