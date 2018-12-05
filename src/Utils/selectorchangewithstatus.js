export function selectorChangeWithStatus(event)
{
  this.setState({
    selected: event.target.value }
  );

  if (event.target.value === 'checkboxBlankCircleOutline' || event.target.value === "checkboxMultipleBlankCircleOutline")
  {
    this.setState({
      type: 'event',
      status: '0',
    })
  }

  if (event.target.value === 'checkboxBlankCircle' || event.target.value === "checkboxMultipleBlankCircle")
  {
    this.setState({
      type: 'event',
      status: '1',
    })
  }

  if (event.target.value === 'checkboxBlankOutline' || event.target.value === "checkboxMultipleBlankOutline")
  {
    this.setState({
      type: 'task',
      status: '0',
    })
  }

  if (event.target.value === 'checkboxBlank' || event.target.value === "checkboxMultipleBlank")
  {
    this.setState({
      type: 'task',
      status: '1',
    })
  }

  if (event.target.value === 'checkboxBlankTriangleOutline' || event.target.value === "checkboxMultipleBlankTriangleOutline")
  {
    this.setState({
      type: 'appointment',
      status: '0',
    })
  }

  if (event.target.value === 'checkboxBlankTriangle' || event.target.value === "checkboxMultipleBlankTriangle")
  {
    this.setState({
      type: 'appointment',
      status: '1',
    })
  }

};
