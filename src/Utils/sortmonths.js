import moment from 'moment'

export function sortMonths(months)
{
  months.sort(function (a, b) {
      return moment(b, 'MMMM, YYYY').unix()  - moment(a, 'MMMM, YYYY').unix() 
  })

  return months;
};
