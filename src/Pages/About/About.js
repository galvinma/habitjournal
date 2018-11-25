import React from 'react'
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";

// functions
import { checkAuth } from '../.././Utils/checkauth'

// Components
import InternalNavBar from '../.././Components/NavBar/InternalNavBar'

// css
import './About.css'

// Images
var flower = require('../.././Images/about.svg')

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flexStart',
    marginTop: '80px',
    marginLeft: '50px',
    marginRight: '50px',
  },
});

class About extends React.Component {
  constructor(props)
  {
    super(props);

    checkAuth()
  }

  render() {
    if (store.getState().auth_status.auth_status === false) {
      return <Redirect to='/' />
    }

    return(
      <div>
        <InternalNavBar />
        <img id="about_flower" alt="" style ={ { backgroundImage: "url("+flower+")" } }/>
        <div className={this.props.classes.root}>
        <Typography component="div" variant="headline">What is Daisy Journal?</Typography>
        <Typography component="div" variant="body1">
        Daisy Journal is open source planning software.
        </Typography>

        </div>
      </div>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth_status: state.auth_status,
    current_user: state.current_user
  }
}

export default connect(mapStateToProps)(withStyles(styles)(About));
