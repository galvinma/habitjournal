import axios from 'axios';

export function updateHabit()
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