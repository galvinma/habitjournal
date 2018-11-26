import React from 'react'
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

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
    alignItems: 'flex-start',
    marginTop: '80px',
    marginBottom: '20px',
    marginLeft: '20px',
    marginRight: '20px',
    minHeight: '80vh',

    [theme.breakpoints.down(768)]: {
      marginLeft: '8px',
      marginRight: '8px',
      marginTop: '64px',
    },
  },
  about_container: {
    minHeight: '80vh',
    marginTop: '8px',
    marginLeft: '20px',
    marginRight: '20px',
  },
  img_containter: {
    marginLeft: 'auto'
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
        <Paper className={this.props.classes.root}>
          <div className={this.props.classes.about_container}>
            <div className={this.props.classes.img_containter}>
              <img id="about_flower" alt="" style ={ { backgroundImage: "url("+flower+")" } }/>
            </div>
            <Typography component="div" variant="headline">What is Daisy Journal?</Typography>
            <Typography component="div" variant="body1">
            Daisy Journal is open source planning software.
            </Typography>
          </div>
        </Paper>
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
