export function changeSelectedMonth(date)
{
  this.setState({
    selectedMonth: date,
  })

  this.getBullets()
}
