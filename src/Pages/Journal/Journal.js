import React from 'react'
import axios from 'axios';
import moment from 'moment'
import { Redirect } from 'react-router-dom';
import lifecycle from 'react-pure-lifecycle';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {  mdiSquare,
          mdiSquareOutline,
          mdiCircle,
          mdiCircleOutline,
          mdiTriangle,
          mdiTriangleOutline,
          mdiClose,
        } from '@mdi/js'

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
  bullet_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    padding: '20px',
  },
  month_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  journal_container: {
    display: 'flex',
    flexDirection: 'row',
  }
});

class Journal extends React.Component {
  constructor(props){
  super(props);
  this.state = {
    bullets: {}, // date --> bullet list
    description: '',
    type: 'task',
    selected: 'mdiSquareOutline',
    selectedMonth: moment().format('MMMM, YYYY'), // initializes to current month
    selectedDate: moment().unix(), // moment(new Date()).format('YYYY/MM/DD')
    navigatorMonths: [],
  };

  checkAuth()
  this.getBullets()

  this.addBullet = this.addBullet.bind(this)
  this.selectorChange = this.selectorChange.bind(this)
  this.descriptionChange = this.descriptionChange.bind(this)
  this.removeBullet = this.removeBullet.bind(this)
  this.toggleIcon = this.toggleIcon.bind(this)
  this.updateBulletDescription = this.updateBulletDescription.bind(this)
  this.checkSubmit = this.checkSubmit.bind(this)
  this.changeSelectedMonth = this.changeSelectedMonth.bind(this)
  this.dateChange = this.dateChange.bind(this)
  }

  addBullet()
  {
    axios.post('http://127.0.0.1:5002/api/save_bullet', {
      params: {
        user: sessionStorage.getItem('user'),
        type: this.state.type,
        description: this.state.description,
        date: this.state.selectedDate // moment().unix();
      }
    })
    .then((response) => {
      this.setState({
        description: ""
      });

    })
    .catch((error)=>{
      console.log(error);
    });

    this.getBullets()
  }

  getBullets()
  {
    axios.post('http://127.0.0.1:5002/api/return_bullets', {
      params: {
        user: sessionStorage.getItem('user'),
      }
    })
    .then((response) => {
      var res = response.data.bullets
      var new_bullets = {}
      var new_months = []
      res.forEach(bullet => {
          let timestamp = moment.unix(bullet.date).format('dddd, MMMM Do, YYYY')
          let navMonth = moment.unix(bullet.date).format('MMMM, YYYY')

          // create a list of all bullets for the given month
          if (navMonth === this.state.selectedMonth)
          {
            if (!(new_bullets[timestamp]))
            {
              new_bullets[timestamp] = [bullet]
            }
            else
            {
              new_bullets[timestamp].push(bullet)
            }
          }

          // create a list of all available months
          if (new_months.indexOf(navMonth) === -1)
          {
            new_months.push(navMonth)
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

    // mdiCircleOutline = Event
    // mdiSquareOutline = Task
    // mdiTriangleOutline = Habit
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
        type: 'habit' });
    }

  };

  checkSubmit(event)
  {
    if (event.keyCode === 13) {
        this.addBullet()
    }
  }

  descriptionChange(event)
  {
    this.setState({
      description: event.target.value
    });
  };

  removeBullet(id)
  {
    axios.post('http://127.0.0.1:5002/api/remove_bullet', {
      params: {
        bullet_id: id
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

  toggleIcon(id, type, status)
  {

    axios.post('http://127.0.0.1:5002/api/update_bullet_status', {
      params: {
        bullet_id: id,
        type: type,
        status: status,
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

  updateBulletDescription(bullet_id)
  {
    var val = document.getElementById(bullet_id).value;
    axios.post('http://127.0.0.1:5002/api/update_bullet_description', {
      params: {
        bullet_id: bullet_id,
        description: val,
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

  changeSelectedMonth(date)
  {
    this.setState({
      selectedMonth: date,
    })

    this.getBullets()
  }

  dateChange(event)
  {
    this.setState({
      selectedDate: moment(event.target.value, "YYYY/M/D").unix()
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
            <Key />
            <div className={this.props.classes.bullet_container}>
              <BulletSelector
                checkSubmit = {this.checkSubmit}
                selectorChange = {this.selectorChange}
                descriptionChange = {this.descriptionChange}
                addBullet = {this.addBullet}
                dateChange = {this.dateChange}
                selected={this.state.selected}
                description={this.state.description}
                type={this.state.type}
                bullets={this.state.bullets}
                selectedMonth={this.state.selectedMonth}
                selectedDate={this.state.selectedDate} />
              <BulletList
                bullets={this.state.bullets}
                removeBullet={this.removeBullet}
                toggleIcon={this.toggleIcon}
                updateBulletDescription={this.updateBulletDescription}
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
