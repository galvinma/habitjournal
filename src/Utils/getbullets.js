import axios from 'axios';
import moment from 'moment'

// functions
import { sortBulletObject } from './sortbullets'

// redux
import store from '.././Store/store'
import { connect } from "react-redux";
import { getAllEntries, getNavMonths } from '.././Actions/actions'

export function getBullets()
{
  axios.post('http://127.0.0.1:5002/api/return_entries', {
    params: {
      user: sessionStorage.getItem('user'),
    }
  })
  .then((response) => {
    var res = response.data.entries
    var new_bullets = {}
    var new_months = []
    res.forEach(bullet => {
        if (bullet.type !== "habit")
        {
          var ref_date = moment.unix(bullet.start_date)
          var start_date = moment.unix(bullet.start_date)
          var end_date = moment.unix(bullet.end_date)

          while (moment(ref_date).isSameOrBefore(moment(end_date), 'days'))
          {
            var temp = Object.assign([], bullet);
            var navMonth = moment(ref_date).format('MMMM, YYYY')

            if (navMonth === this.state.selectedMonth)
            {
              if (!(new_bullets[moment(ref_date).format('dddd, MMMM Do, YYYY')]))
              {
                new_bullets[moment(ref_date).format('dddd, MMMM Do, YYYY')] = []
              }


              if (!(moment(start_date).isSame(moment(end_date), 'days')))
              {
                if (moment(ref_date).isSame(moment.unix(bullet.start_date), 'days'))
                {
                  temp.end_time = moment.unix(temp.start_date).endOf('day').unix()
                }

                if (moment(ref_date).isSame(moment.unix(bullet.end_date), 'days'))
                {
                  temp.start_time = moment.unix(temp.end_date).startOf('day').unix()
                }

                if ((moment(ref_date).isAfter(moment.unix(bullet.start_date))) &&
                    (moment(ref_date).isBefore(moment.unix(bullet.end_date))))
                {
                  temp.start_time = moment.unix(ref_date).startOf('day').unix()
                  temp.end_time = moment.unix(ref_date).endOf('day').unix()

                }
              }

              new_bullets[moment(ref_date).format('dddd, MMMM Do, YYYY')].push(temp)
            }
            // create a list of all available months
            if (new_months.indexOf(navMonth) === -1)
            {
              new_months.push(navMonth)
            }

            ref_date = moment(ref_date).add(1, 'days')
          }
        }
    })
    new_bullets = sortBulletObject(new_bullets)

    this.setState({
      bullets: new_bullets,
      navigatorMonths: new_months,
    })

    store.dispatch(getAllEntries({
      all_entries: new_bullets,
    }))

    store.dispatch(getNavMonths({
      nav_months: new_months,
    }))


  })
  .catch((error)=>{
    console.log(error);
  });

}
