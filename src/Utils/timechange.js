import moment from 'moment'

export function timeChange(event, state)
{
  if (state === 'start')
  {
    this.setState({
      startTime: moment(event).unix()
    })
  }
  else if (state === 'end')
  {
    this.setState({
      endTime: moment(event).unix()
    })
  }
}
