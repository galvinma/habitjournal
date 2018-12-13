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
    minWidth: '80vw',
    minHeight: 'calc(100vh - 132px)',
    maxWidth: '100vw',
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
  about_container: {
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
            <Typography component="div" variant="headline">
              How do I use Daisy Journal?
            </Typography>
            <Typography component="div" variant="body1">
              Daisy Journal allows for easy habit logging and event tracking. The interface currently consists of three tabs:
                <ul>
                  <li>Journal</li>
                  <li>Habits</li>
                  <li>Calendar</li>
                </ul>
              The Journal page allows for the creation of tasks, events, notes, and appointments. The Habits page is for tracking reoccurring life events. The Calendar gives an overview of completed and due tasks at the month level.
              <br />
              Take a few minutes each morning to plan your day. What do you want to accomplish? On a weekly basis view your habit frequency. Are you reaching your goals?

            </Typography>
            <br />
            <Typography component="div" variant="headline">
              Is it free?
            </Typography>
            <Typography component="div" variant="body1">
              Daisy Journal is free and open source.
            </Typography>
            <br />
            <Typography component="div" variant="headline">
              Is it private?
            </Typography>
            <Typography component="div" variant="body1">
              Yes. Daisy Journal was built for people, not profit. Daisy Journal will never sell your data.
            </Typography>
            <br />
            <Typography component="div" variant="headline">
              How can I contribute?
            </Typography>
            <Typography component="div" variant="body1">
              There are a number of ways to help build the community.
              <ul>
                <li>If you are a software developer, consider submitting a pull request on <a className={this.props.classes.link} href="https://github.com/galvinma/daisyjournal">github</a>.</li>
                <li>Have an idea on how to make Daisy Journal better? Send the development team an <a className={this.props.classes.link} href="mailto:daisyjournal.development@gmail.com">email</a>.</li>
                <li>Daisy Journal is run on donations. If you have the means, please consider donating to the development team.</li>
              </ul>
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

export default (withStyles(styles)(About));
