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
    bullets: {}, // date --> bullet list
    title: '',
    type: 'task',
    selected: 'mdiSquareOutline',
    selectedMonth: moment().format('MMMM, YYYY'), // initializes to current month
    startDate: moment().unix(),
    endDate: moment().unix(),
    startTime: moment().unix(),
    endTime: moment().unix(),
    navigatorMonths: [],
    checkedAllDay: true,
  };

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
    console.log(event)
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

  handleAllDay(event)
  {
    if (event.target.checked === true)
    {
       var l = document.getElementsByClassName("time_pick")
       for (var i = 0; i < l.length; i++)
       {
        l[i].style.display = "none"
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
  };

  addBullet()
  {
    axios.post('http://127.0.0.1:5002/api/save_entry', {
      params: {
        user: sessionStorage.getItem('user'),
        type: this.state.type,
        title: this.state.title,
        start_date: this.state.startDate,
        end_date: this.state.endDate,
        start_time: this.state.startTime,
        end_time: this.state.endTime,
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
            // var start_date = moment.unix(bullet.start_date).format('dddd, MMMM Do, YYYY')
            // var end_date = moment.unix(bullet.end_date).format('dddd, MMMM Do, YYYY')
            var start_date = moment.unix(bullet.start_date)
            var end_date = moment.unix(bullet.end_date)
            console.log("end date is "+end_date)

            while (moment(start_date).isSameOrBefore(moment(end_date), 'days'))
            {
              console.log("in loop, start date is "+start_date)
              let navMonth = moment(start_date).format('MMMM, YYYY')

              if (navMonth === this.state.selectedMonth)
              {
                if (!(new_bullets[moment(start_date).format('dddd, MMMM Do, YYYY')]))
                {
                  new_bullets[moment(start_date).format('dddd, MMMM Do, YYYY')] = [bullet]
                }
                else
                {
                  new_bullets[moment(start_date).format('dddd, MMMM Do, YYYY')].push(bullet)
                }
              }
              // create a list of all available months
              if (new_months.indexOf(navMonth) === -1)
              {
                new_months.push(navMonth)
              }

              start_date = moment(start_date).add(1, 'days')
            }

            console.log("out of loop, start date is "+start_date)
          }
      })

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
      console.log(response)
      this.getBullets()

    })
    .catch((error)=>{
      console.log(error);
    });
  }

  updateBulletTitle(entry_id, val)
  {
    // var val = document.getElementById(entry_id).value;
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

    this.getBullets()
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
                selected={this.state.selected}
                title={this.state.title}
                type={this.state.type}
                bullets={this.state.bullets}
                selectedMonth={this.state.selectedMonth}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                startTime={this.state.startTime}
                endTime={this.state.endTime}
                checkedAllDay={this.state.checkedAllDay} />
              <BulletList
                bullets={this.state.bullets}
                removeBullet={this.removeBullet}
                toggleIcon={this.toggleIcon}
                getBullets={this.getBullets}
                updateBulletTitle={this.updateBulletTitle}
                className={this.props.classes.bulletlist} />
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
