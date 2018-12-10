import axios from 'axios';

export function deleteHabit()
  {
    axios.post(`${process.env.REACT_APP_DAISY_JOURNAL_API_URI}/api/remove_habit`, {
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
