import React from 'react'
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

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
var journal_img = require('../.././Images/Info/journal.png')
var habits_img = require('../.././Images/Info/habits.png')
var calendar_img = require('../.././Images/Info/calendar.png')

const styles = theme => ({
  body_text: {
    fontSize: '14px',
    fontFamily: 'Nunito',
    fontWeight: '500',
    marginBottom: '20px',
  },
  carousel_container: {
    maxWidth: '853px',
    borderRadius: '5px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  container_one: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    minWidth: '80vw',
    maxWidth: '100vw',
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
    marginBottom: '20px',
    width: '100%',

    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
    },
  },
  header_text: {
    fontSize: '32px',
    fontFamily: 'Nunito',
    fontWeight: '500',
    marginBottom: '20px',
    width: '100%',

    [theme.breakpoints.down(768)]: {
      fontSize: '28px',
    },

    [theme.breakpoints.down(550)]: {
      fontSize: '24px',
      marginBottom: '8px',
    },
  },
  image: {
    maxHeight: '859px',
    maxWidth: '853px',
    borderRadius: '5px',
  },
  image_container: {
    width: '60%',
    paddingLeft: '20px',
    paddingRight: '20px',

    [theme.breakpoints.down(768)]: {
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: '8px',
      paddingRight: '8px',
    },

    [theme.breakpoints.up(1500)]: {
      width: '50%',
    },
  },
  info_container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '8px',
    width: '100%',

    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
    },
  },
  link_text: {
    textDecoration: 'underline',
    color: 'inherit',
    fontSize: '18px',
    fontFamily: 'Nunito',
    marginTop: '40px',

    [theme.breakpoints.down(768)]: {
      marginTop: '20px',
      marginBottom: '20px',
    },
  },
  text_container: {
    width: '40%',
    paddingLeft: '20px',
    paddingRight: '20px',

    [theme.breakpoints.down(768)]: {
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'center',
    },

    [theme.breakpoints.up(1500)]: {
      width: '50%',
    },
  },
});

class Description extends React.Component {
  render() {
    return(
      <div>
        <PromptNavBar />
        <Paper className={this.props.classes.container_one}>
          <div className={this.props.classes.info_container}>
            <div className={this.props.classes.content_divider}>
              <div className={this.props.classes.text_container}>
                <div className={this.props.classes.header_text}>
                  Plan your day
                </div>
                <div className={this.props.classes.body_text}>
                  Create bullet entries for tasks, events, notes, and appointments. Organize in real time. Mark items complete at the click of a mouse. Set yourself up for success.
                </div>
                <div className={this.props.classes.header_text}>Track habits</div>
                <div className={this.props.classes.body_text}>Methodically track the progress of all your life goals. Establish a routine and create your story. Be accountable to yourself and your team.</div>
                <div className={this.props.classes.header_text}>Get Perspective</div>
                <div className={this.props.classes.body_text}>
                  Stay on top of your commitments. Use the built in calendar to ensure all your obligations are fulfilled. Make deadlines. Celebrate achievements. Know where you stand and prioritize as needed.
                </div>
                <div className={this.props.classes.link_text}>
                <a className={this.props.classes.link_text} href='#/join'>Try Daisy Journal Today</a></div>
              </div>
              <div className={this.props.classes.image_container}>
                <Carousel className={this.props.classes.carousel_container} autoPlay stopOnHover showIndicators={true} showThumbs={false} showStatus={false} transitionTime={2000}>
                  <div>
                      <img className={this.props.classes.image} src={journal_img} />
                  </div>
                  <div>
                      <img className={this.props.classes.image} src={habits_img}/>
                  </div>
                  <div>
                      <img className={this.props.classes.image} src={calendar_img} />
                  </div>
                </Carousel>
              </div>
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
