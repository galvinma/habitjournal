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
var journal_img = require('../.././Images/Info/journal_full.png')
var habits_img = require('../.././Images/Info/habits_full.png')
var calendar_img = require('../.././Images/Info/calendar_full.png')

const styles = theme => ({
  body_text: {
    fontSize: '14px',
    fontFamily: 'Nunito',
    fontWeight: '500',
  },
  container_one: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    minWidth: '80vw',
    maxwidth: '100vw',
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
  content_divider: {
    display: 'flex',
    flexDirection: 'row',
  },
  description_containter: {
    marginTop: '8px',
    marginLeft: '20px',
    marginRight: '20px',
  },
  header_text: {
    fontSize: '24px',
    fontFamily: 'Nunito',
    fontWeight: '500',
    marginBottom: '8px',
  },
  image: {
    height: 'auto',
    width: '100%',
  },
  image_container: {
    maxWidth: '45vw'
  },
  info_container: {
    marginTop: '8px',
    marginLeft: '20px',
    marginRight: '20px',
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
          <div className={this.props.classes.info_container}>
            <div className={this.props.classes.header_text}>Plan your day</div>
            <div className={this.props.classes.content_divider}>
              <div className={this.props.classes.image_container}>
                <img src={journal_img} className={this.props.classes.image}/>
              </div>
              <div className={this.props.classes.body_text}>Create bullet entries for tasks, events, and appointments. </div>
            </div>


            <div className={this.props.classes.header_text}>Track Habits</div>
            <div className={this.props.classes.content_divider}>
              <div className={this.props.classes.body_text}>Set yourself up for success</div>
              <img src={habits_img} className={this.props.classes.body_image}/>
            </div>
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
