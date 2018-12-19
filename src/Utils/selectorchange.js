export function selectorChange(event)
{

  this.setState({
    selected: event.target.value }
  );

  if (event.target.value === 'checkboxBlankCircleOutline')
  {
    this.setState({
      type: 'event' });
  }
  if (event.target.value === 'checkboxBlankOutline')
  {
    this.setState({
      type: 'task' });
  }

  if (event.target.value === 'checkboxBlankTriangleOutline')
  {
    this.setState({
      type: 'appointment' });
  }

  if (event.target.value === 'minus')
  {
    this.setState({
      type: 'note' });
  }

};
