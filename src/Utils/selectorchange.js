export function selectorChange(event)
{

  this.setState({
    selected: event.target.value }
  );

  if (event.target.value === 'mdiCircleOutline')
  {
    this.setState({
      type: 'event' });
  }
  if (event.target.value === 'mdiSquareOutline')
  {
    this.setState({
      type: 'task' });
  }

  if (event.target.value === 'mdiTriangleOutline')
  {
    this.setState({
      type: 'appointment' });
  }

  if (event.target.value === 'mdiMinus')
  {
    this.setState({
      type: 'note' });
  }

};
