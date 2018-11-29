import moment from 'moment'

export function dateChange(event, state)
{
  if (state === 'start')
  {
    let delta = this.state.startTime - this.state.startDate
    let end_delta = this.state.endTime - this.state.endDate
    this.setState({
      startDate: moment(event).startOf('day').unix(),
      startTime: moment(event).startOf('day').unix()+delta
    })

    if (this.state.checkedAllDay === false && this.state.checkedMultiDay === false)
    {
      this.setState({
        endDate: moment(event).startOf('day').unix(),
        endTime: moment(event).startOf('day').unix()+end_delta
      })
    }
  }
  else if (state === 'end')
  {
    let delta = this.state.endTime - this.state.endDate
    this.setState({
      endDate: moment(event).startOf('day').unix(),
      endTime: moment(event).startOf('day').unix()+delta
    })
  }
}
