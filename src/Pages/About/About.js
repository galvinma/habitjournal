import React from 'react'
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import history from '../.././history';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
var flower = require('../.././Images/Icons/flower.svg')
var checkboxBlankCircleOutline = require('../.././Images/Icons/checkbox-blank-circle-outline.svg')
var checkboxBlankOutline = require('../.././Images/Icons/checkbox-blank-outline.svg')
var checkboxBlankTriangleOutline = require('../.././Images/Icons/checkbox-blank-triangle-outline.svg')
var minus = require('../.././Images/Icons/minus.svg')
var selector = require('../.././Images/selector.png')

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
  },
  icon_style: {
    paddingLeft: '5px',
    paddingRight: '12px',
    height: '18px',
  },
  icon_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flexStart',
    alignItems: 'center',
    marginLeft: '24px',
  },
});

class About extends React.Component {
  constructor(props)
  {
    super(props);
  }

  render() {
    if (store.getState().auth_status.auth_status === false)
    {
      checkAuth()
      .then(function(){
          if (store.getState().auth_status.auth_status === false)
          {
            history.push('/');
          }
      })
      .catch(function(error)
      {
        history.push('/');
      })
    }

    return(
      <div>
        <InternalNavBar />
        <Paper className={this.props.classes.root}>
          <div className={this.props.classes.about_container}>
            <Typography component="div" variant="headline">
              How do I use Daisy Journal?
            </Typography>
            <br />
            <Typography component="div" variant="body1">
              Daisy Journal allows for easy habit logging and event tracking. The Journal page allows for the creation of tasks, events, notes, and appointments. The Habits page is for tracking reoccurring life events. The Calendar gives an overview of completed and upcoming tasks at the month level. Take a few minutes each morning to plan your day. What are todays obligations? On a weekly basis view your habit frequency and set new goals.

            </Typography>
            <br />
            <Typography component="div" variant="headline">
              How do I create a new line item?
            </Typography>
            <br />
            <Typography component="div" variant="body1">
              On the journal page, use the selector to pick an entry type. Create a title for the entry, and then fill in the item start and end criteria. To generate the new entry press enter.
            </Typography>
            <br />
            <img src={selector} />

            <br />
            <Typography component="div" variant="headline">
              What do the symbols mean?
            </Typography>
            <br />
            <Typography component="div" variant="body1">
              Each symbol represents a different type of entry. For example, use the triangle icon for a doctor's appointment, or the circle for a birthday party.  An outline indicates the entry has not been completed. Clicking the icon fills in the item and signifies a completed task.
            </Typography>
            <br />
            <div className={this.props.classes.icon_container}>
              <img src={checkboxBlankOutline} className={this.props.classes.icon_style}/>
              <Typography variant="body1">Task</Typography>
            </div>

            <div className={this.props.classes.icon_container}>
              <img src={checkboxBlankCircleOutline} className={this.props.classes.icon_style}/>
              <Typography variant="body1">Event</Typography>
            </div>

            <div className={this.props.classes.icon_container}>
              <img src={checkboxBlankTriangleOutline} className={this.props.classes.icon_style}/>
              <Typography variant="body1">Appointment</Typography>
            </div>

            <div className={this.props.classes.icon_container}>
              <img src={minus} className={this.props.classes.icon_style}/>
              <Typography variant="body1">Note</Typography>
            </div>

            <div className={this.props.classes.icon_container}>
              <img src={flower} className={this.props.classes.icon_style}/>
              <Typography variant="body1">Habit</Typography>
            </div>

            <br />
            <Typography component="div" variant="headline">
              Is it free?
            </Typography>
            <br />
            <Typography component="div" variant="body1">
              Daisy Journal is free and <a className={this.props.classes.link} href="https://github.com/galvinma/daisyjournal">open source</a>.
            </Typography>
            <br />
            <Typography component="div" variant="headline">
              Is it private?
            </Typography>
            <br />
            <Typography component="div" variant="body1">
              Yes. Daisy Journal was built for people, not profit. Daisy Journal will never sell your data. That being said if you want absolute control over your data <a className={this.props.classes.link} href="https://github.com/galvinma/daisyjournal">clone the project</a> and run the application locally.
            </Typography>
            <br />
            <Typography component="div" variant="headline">
              How can I contribute?
            </Typography>
            <br />
            <Typography component="div" variant="body1">
              There are a number of ways to help build the community.
              <ul>
                <li>If you are a software developer, consider submitting a pull request on <a className={this.props.classes.link} href="https://github.com/galvinma/daisyjournal">github</a>.</li>
                <li>Have an idea on how to make Daisy Journal better? Send the development team an <a className={this.props.classes.link} href="mailto:daisyjournal.development@gmail.com">email</a>.</li>
                <li>Daisy Journal is run on donations. If you have the means, please consider <a className={this.props.classes.link} href="https://buymeacoff.ee/Wd0ji9Y6O">donating</a> to the development team.</li>
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

export default withStyles(styles)(About);
