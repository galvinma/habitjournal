import React from 'react'
import { Redirect } from 'react-router-dom';
import lifecycle from 'react-pure-lifecycle';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// Components
import InternalNavBar from '../.././Components/NavBar/InternalNavBar'
import BulletList from '../.././Components/BulletList/BulletList'

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
  bulletlist: {

  }
});

class Journal extends React.Component {
  constructor(props){
  super(props);

  checkAuth()

  }

  render() {
    if (store.getState().auth_status.auth_status === false) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <InternalNavBar />
          <BulletList className={this.props.classes.bulletlist}/>
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
