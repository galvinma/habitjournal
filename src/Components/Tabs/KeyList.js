import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@mdi/react'

const styles = theme => ({
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
})

var flower = require('../.././Images/Icons/flower.svg')
var checkboxBlankCircleOutline = require('../.././Images/Icons/checkbox-blank-circle-outline.svg')
var checkboxBlankOutline = require('../.././Images/Icons/checkbox-blank-outline.svg')
var checkboxBlankTriangleOutline = require('../.././Images/Icons/checkbox-blank-triangle-outline.svg')
var minus = require('../.././Images/Icons/minus.svg')

class KeyList extends React.Component {
  render() {
    return (
      <div>
        <List>
          <ListItem>
              <div className={this.props.classes.icon_container}>
                <img src={checkboxBlankOutline} className={this.props.classes.icon_style}/>
                <Typography variant="body1">Task</Typography>
              </div>
          </ListItem>
          <ListItem >
              <div className={this.props.classes.icon_container}>
                <img src={checkboxBlankCircleOutline} className={this.props.classes.icon_style}/>
                <Typography variant="body1">Event</Typography>
              </div>
          </ListItem>
          <ListItem>
              <div className={this.props.classes.icon_container}>
                <img src={checkboxBlankTriangleOutline} className={this.props.classes.icon_style}/>
                <Typography variant="body1">Appointment</Typography>
              </div>
          </ListItem>
          <ListItem>
              <div className={this.props.classes.icon_container}>
                <img src={minus} className={this.props.classes.icon_style}/>
                <Typography variant="body1">Note</Typography>
              </div>
          </ListItem>
        </List>  
    </div>
  )}
}


KeyList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(KeyList);
