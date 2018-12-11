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
import PromptNavBar from '../.././Components/NavBar/PromptNavBar'

// css
import './Description.css'

// Images
var flower = require('../.././Images/about.svg')

const styles = theme => ({
  container_one: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '40vw',
    minHeight: 'calc(50vh - 132px)',
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '20px',
    marginRight: '20px',

    [theme.breakpoints.down(768)]: {
      marginLeft: '8px',
      marginRight: '8px',
      marginTop: '8px',
    },
  },
  description_containter: {
    marginTop: '8px',
    marginLeft: '20px',
    marginRight: '20px',
  },
  img_containter: {
    marginLeft: 'auto'
  },
  link: {
    textDecoration: 'underline',
    color: 'inherit'
  }
});

class Description extends React.Component {
  render() {
    return(
      <div>
        <PromptNavBar />

          <Paper className={this.props.classes.container_one}>
            <p>This is some text</p>
            <div className={this.props.classes.img_containter}>
              <img src={flower} className={this.props.classes.flower}/>
            </div>
          </Paper>
        <div id="block_one"/>
        <div id="block_two"/>
      </div>
    );
  }
}

Description.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth_status: state.auth_status,
    current_user: state.current_user
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Description));
