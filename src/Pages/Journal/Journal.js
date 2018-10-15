import React from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import lifecycle from 'react-pure-lifecycle';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// Components
import InternalNavBar from '../.././Components/NavBar/InternalNavBar'
import BulletList from '../.././Components/BulletList/BulletList'
import BulletSelector from '../.././Components/BulletList/BulletSelector'

// functions
import { checkAuth } from '../.././Utils/checkauth'

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";

const styles = theme => ({
  paper: {
    marginLeft: '15vw',
    marginRight: '15vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    padding: '20px',
  },
});

class Journal extends React.Component {
  constructor(props){
  super(props);
  this.state = {
    bullets: [],
    description: '',
    type: 'task',
    selected: 'mdiSquareOutline',
  };

  checkAuth()
  this.getBullets()
  this.addBullet = this.addBullet.bind(this)
  this.selectorChange = this.selectorChange.bind(this)
  this.descriptionChange = this.descriptionChange.bind(this)
  this.addBullet = this.addBullet.bind(this)

  }

  addBullet() {
    axios.post('http://127.0.0.1:5002/api/save_bullet', {
      params: {
        user: sessionStorage.getItem('user'),
        type: this.state.type,
        description: this.state.description,
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

  getBullets() {
    axios.post('http://127.0.0.1:5002/api/return_bullets', {
      params: {
        user: sessionStorage.getItem('user'),
      }
    })
    .then((response) => {
      var res = response.data.bullets
      var new_bullets = []
      res.forEach(bullet => {
          new_bullets.push(bullet)
      })
      this.setState({
        bullets: new_bullets
      })

    })
    .catch((error)=>{
      console.log(error);
    });
  }

  selectorChange(event) {

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

  descriptionChange(event) {
    this.setState({
      description: event.target.value });
  };

  render() {
    if (store.getState().auth_status.auth_status === false) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <InternalNavBar />
          <BulletSelector
            selectorChange = {this.selectorChange}
            descriptionChange = {this.descriptionChange}
            addBullet = {this.addBullet}
            selected={this.state.selected}
            description={this.state.description} />
          <BulletList bullets={this.state.bullets} className={this.props.classes.bulletlist}/>
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
