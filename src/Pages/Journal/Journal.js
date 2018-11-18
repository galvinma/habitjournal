import React from 'react'
import axios from 'axios';
import moment from 'moment'
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Components
import InternalNavBar from '../.././Components/NavBar/InternalNavBar'
import BulletList from '../.././Components/BulletList/BulletList'
import BulletSelector from '../.././Components/BulletList/BulletSelector'
import BulletNavigator from '../.././Components/BulletList/BulletNavigator'
import Key from '../.././Components/BulletList/Key'

// functions
import { checkAuth } from '../.././Utils/checkauth'
import { sortBulletObject } from '../.././Utils/sortbullets'

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";

const styles = theme => ({
  journal_container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '25px', // aligns with frozen left and right panel
    minWidth: '100vw',
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      marginTop: '5px', // aligns with frozen left and right panel
    },
  },
  bullet_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    marginTop: '75px',
    maxWidth: '60vw',

    [theme.breakpoints.down(768)]: {
      marginTop: '50px', // 40 for navbar, 10 for spacing
      minWidth: '90vw',
      paddingLeft: '20px',
      paddingRight: '20px',
    },
  },
  month_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    height: '90vh',
    marginLeft: 'auto',
    minWidth: '20vw',
    maxWidth: '20vw',

    [theme.breakpoints.down(768)]: {
      minWidth: '90vw',
      order: '50',
      paddingLeft: '20px',
      paddingRight: '20px',
      height: 'auto',
    },
  },
  key_container: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '20px',
    height: '90vh',
    minWidth: '20vw',
    maxWidth: '20vw',

    [theme.breakpoints.down(768)]: {
      height: '120px',
      minWidth: '90vw',
      marginTop: 'auto',
      order: '100',
      height: 'auto',
    },
  },
});

class Journal extends React.Component {
  constructor(props){
  super(props);

  this.state = {
    bullets: {},
    title: '',
    type: 'task',
    selected: 'mdiSquareOutline',
    selectedMonth: moment().format('MMMM, YYYY'),
    reference: moment().startOf('day').unix(),
    startDate: moment().unix(),
    endDate: moment().unix(),
    startTime: moment().startOf('day').unix(),
    endTime: moment().endOf('day').unix(),
    navigatorMonths: [],
    checkedAllDay: true,
    checkedMultiDay: false,
  }

  checkAuth()
  this.getBullets()

  this.addBullet = this.addBullet.bind(this)
  this.selectorChange = this.selectorChange.bind(this)
  this.titleChange = this.titleChange.bind(this)
  this.removeBullet = this.removeBullet.bind(this)
  this.updateBulletTitle = this.updateBulletTitle.bind(this)
  this.checkSubmit = this.checkSubmit.bind(this)
  this.changeSelectedMonth = this.changeSelectedMonth.bind(this)
  this.timeChange = this.timeChange.bind(this)
  this.dateChange = this.dateChange.bind(this)
  this.getBullets = this.getBullets.bind(this)
  this.handleAllDay = this.handleAllDay.bind(this)
  this.handleMultiDay = this.handleMultiDay.bind(this)
  this.updateBulletTimes = this.updateBulletTimes.bind(this)
  this.blurHandler = this.blurHandler.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.bullets !== this.state.bullets ||
        nextState.navigatorMonths !== this.state.navigatorMonths ||
        nextState.selected !== this.state.selected ||
        nextState.type !== this.state.type ||
        nextState.startDate !== this.state.startDate ||
        nextState.endDate !== this.state.endDate ||
        nextState.startTime !== this.state.startTime ||
        nextState.endTime !== this.state.endTime ||
        nextState.checkedMultiDay !== this.state.checkedMultiDay ||
        nextState.checkedAllDay !== this.state.checkedAllDay)
    {
      return true
    }
    else
    {
      return false
    }
  }

  blurHandler()
  {
    this.getBullets()
  }

  changeSelectedMonth(date)
  {
    this.setState({
      selectedMonth: date,
    })

    this.getBullets()
  }

  dateChange(event, state)
  {
    if (state === 'start')
    {
      this.setState({
        startDate: moment(event).unix()
      })
    }
    else if (state === 'end')
    {
      this.setState({
        endDate: moment(event).unix()
      })
    }
  }

  timeChange(event, state)
  {
    if (state === 'start')
    {
      var delta = moment(event).unix() - this.state.reference
      var utc = moment.unix(this.state.startDate).startOf('day').unix() + delta
      this.setState({
        startTime: moment.unix(utc).unix()
      })
    }
    else if (state === 'end')
    {
      var delta = moment(event).unix() - this.state.reference
      var utc = moment.unix(this.state.endDate).startOf('day').unix() + delta
      this.setState({
        endTime: moment.unix(utc).unix()
      })
    }
  }

  updateBulletTimes(id, event, state)
  {
    axios.post('http://127.0.0.1:5002/api/update_entry_time', {
      params: {
        entry_id: id,
        new_time: moment(event).unix(),
        state: state,
      }
    })
    .then((response) => {
      console.log(response)

    })
    .catch((error)=>{
      console.log(error);
    });

    this.getBullets()
  }

  handleMultiDay(event)
  {
    if (event.target.checked === true)
    {
      document.getElementById("datetwo").style.display = "inline-block"
    }
    else
    {
      document.getElementById("datetwo").style.display = "none"
    }

    this.setState({ checkedMultiDay: event.target.checked });

    if (this.state.checkedAllDay === false || event.target.checked === true)
    {
      document.getElementById("to_spacer").style.display = "inline-block"
    }
    else
    {
      document.getElementById("to_spacer").style.display = "none"
    }
  };

  handleAllDay(event)
  {
    if (event.target.checked === true)
    {
       var l = document.getElementsByClassName("time_pick")
       for (var i = 0; i < l.length; i++)
       {
        l[i].style.display = "none"

        this.setState({
          startDate: moment().unix(),
          endDate: moment().unix(),
          startTime: moment().startOf('day').unix(),
          endTime: moment().endOf('day').unix(),
        })
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

    this.setState({ checkedAllDay: event.target.checked });

    if (event.target.checked === false || this.state.checkedMultiDay === true)
    {
      document.getElementById("to_spacer").style.display = "inline-block"
    }
    else
    {
      document.getElementById("to_spacer").style.display = "none"
    }
  };

  addBullet()
  {
    var end
    var multi_day
    if (this.state.checkedMultiDay === false)
    {
      end = this.state.startDate
      multi_day = false
    }
    else
    {
      end = this.state.endDate
      multi_day = true
    }

    axios.post('http://127.0.0.1:5002/api/save_entry', {
      params: {
        user: sessionStorage.getItem('user'),
        type: this.state.type,
        title: this.state.title,
        start_date: this.state.startDate,
        end_date: end,
        start_time: this.state.startTime,
        end_time: this.state.endTime,
        multi_day: multi_day
      }
    })
    .then((response) => {
      this.setState({
        title: ""
      });
      document.getElementById("bulletSelector").value = ""

      this.getBullets()
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getBullets()
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

    })
    .catch((error)=>{
      console.log(error);
    });

  }

  selectorChange(event)
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

  checkSubmit(event)
  {
    if (event.keyCode === 13) {
        this.addBullet()
    }
  }

  titleChange(event)
  {
    this.setState({
      title: event.target.value
    });
  };

  removeBullet(id)
  {
    axios.post('http://127.0.0.1:5002/api/remove_entry', {
      params: {
        entry_id: id
      }
    })
    .then((response) => {
      this.getBullets()

    })
    .catch((error)=>{
      console.log(error);
    });
  }

  updateBulletTitle(entry_id, val)
  {
    axios.post('http://127.0.0.1:5002/api/update_entry_title', {
      params: {
        entry_id: entry_id,
        title: val,
      }
    })
    .then((response) => {
      console.log(response)

    })
    .catch((error)=>{
      console.log(error);
    });
  }

  render() {
    if (store.getState().auth_status.auth_status === false) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <InternalNavBar />
          <div className={this.props.classes.journal_container}>
            <div className={this.props.classes.key_container}>
              <Key />
            </div>
            <div className={this.props.classes.bullet_container}>
              <BulletSelector
                checkSubmit={this.checkSubmit}
                selectorChange={this.selectorChange}
                titleChange={this.titleChange}
                addBullet={this.addBullet}
                dateChange={this.dateChange}
                timeChange={this.timeChange}
                handleAllDay={this.handleAllDay}
                handleMultiDay={this.handleMultiDay}
                selected={this.state.selected}
                title={this.state.title}
                type={this.state.type}
                bullets={this.state.bullets}
                selectedMonth={this.state.selectedMonth}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                startTime={this.state.startTime}
                endTime={this.state.endTime}
                checkedAllDay={this.state.checkedAllDay}
                checkedMultiDay={this.state.checkedMultiDay} />
              <BulletList
                bullets={this.state.bullets}
                removeBullet={this.removeBullet}
                toggleIcon={this.toggleIcon}
                getBullets={this.getBullets}
                blurHandler={this.blurHandler}
                updateBulletTitle={this.updateBulletTitle}
                updateBulletTimes={this.updateBulletTimes} />
          </div>
          <div className={this.props.classes.month_container}>
            <BulletNavigator
              navigatorMonths={this.state.navigatorMonths}
              changeSelectedMonth={this.changeSelectedMonth}/>
          </div>
        </div>
      </div>
    );
  }
}

Journal.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth_status: state.auth_status,
    current_user: state.current_user
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Journal));
