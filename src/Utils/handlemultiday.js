import moment from 'moment'

export function handleMultiDay(event)
{
  this.setState({ checkedMultiDay: event.target.checked });

  //  Reset the pickers...
  if (event.target.checked === false && this.state.checkedAllDay === true)
  {
    this.setState({
      endDate: moment().startOf('day').unix(),
      endTime: moment().endOf('day').unix(),
    })
  }
  else if (event.target.checked === false && this.state.checkedAllDay === false)
  {
    this.setState({
      endDate: moment.unix(this.state.startDate).startOf('day').unix(),
      endTime: moment.unix(this.state.startDate).endOf('day').unix()
    })
  }
  else if (event.target.checked === true && this.state.checkedAllDay === false)
  {
    this.setState({
      endDate: moment().startOf('day').unix(),
      endTime: moment().endOf('day').unix(),
    })
  }
  else if (event.target.checked === true && this.state.checkedAllDay === true)
  {
    this.setState({
      startTime: moment.unix(this.state.startDate).startOf('day').unix(),
      endTime: moment.unix(this.state.startDate).endOf('day').unix()
    })
  }

  // UI handles...
  if (window.innerWidth < 450 &&
      event.target.checked === false &&
      this.state.checkedAllDay === false)
  {
    document.getElementById("dash_holder").style.display = "flex"
  }
  else if (document.getElementById("dash_holder"))
  {
    document.getElementById("dash_holder").style.display = "none"
  }

  if (event.target.checked === true)
  {
    document.getElementById("datetwo").style.display = "inline-block"
  }
  else
  {
    document.getElementById("datetwo").style.display = "none"
  }

  if (this.state.checkedAllDay === false || event.target.checked === true)
  {
    document.getElementById("to_spacer").style.display = "inline-block"
  }
  else
  {
    document.getElementById("to_spacer").style.display = "none"
  }
};
