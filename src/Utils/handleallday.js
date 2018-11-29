import moment from 'moment'

export function handleAllDay(event)
{
  this.setState({ checkedAllDay: event.target.checked });

  // Reset the pickers...
  if (event.target.checked === true && this.state.checkedMultiDay === true)
  {
    this.setState({
      startTime: moment.unix(this.state.startDate).startOf('day').unix(),
      endTime: moment.unix(this.state.EndDate).endOf('day').unix(),
    })
  }

  else if (event.target.checked === false && this.state.checkedMultiDay === false)
  {
    // Multi day is false, all day is false, reset times to selected day
    this.setState({
      startTime: moment.unix(this.state.startDate).startOf('day').unix(),
      endTime: moment.unix(this.state.startDate).endOf('day').unix(),
      endDate: moment.unix(this.state.startDate).startOf('day').unix(),
    })
  }
  else if (event.target.checked === false && this.state.checkedMultiDay === true)
  {
    // Multi day is true, all day is false, reset times to selected day
    this.setState({
      startTime: moment.unix(this.state.startDate).startOf('day').unix(),
      endTime: moment.unix(this.state.endDate).endOf('day').unix(),
    })
  }
  else if (event.target.checked === true && this.state.checkedMultiDay === false)
  {
    // Multi day is false, reset all
    this.setState({
      startDate: moment.unix(this.state.startDate).startOf('day').unix(),
      endDate: moment.unix(this.state.startDate).startOf('day').unix(),
      startTime: moment.unix(this.state.startDate).startOf('day').unix(),
      endTime: moment.unix(this.state.EndDate).endOf('day').unix(),
    })
  }

  // UI handles
  if (event.target.checked === true)
  {
     var l = document.getElementsByClassName("time_pick")
     for (var i = 0; i < l.length; i++)
     {
      l[i].style.display = "none"
     }
  }
  else
  {
    var l = document.getElementsByClassName("time_pick")
    for (var i = 0; i < l.length; i++)
    {
     l[i].style.display = "inline-block"
    }
  }

  if (event.target.checked === false || this.state.checkedMultiDay === true)
  {
    document.getElementById("to_spacer").style.display = "inline-block"
  }
  else
  {
    document.getElementById("to_spacer").style.display = "none"
  }
};
