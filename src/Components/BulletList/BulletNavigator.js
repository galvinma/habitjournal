import React from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';
import Icon from '@mdi/react'
import {  mdiSquare,
          mdiSquareOutline,
          mdiCircle,
          mdiCircleOutline,
          mdiTriangle,
          mdiTriangleOutline,
          mdiPlus,
        } from '@mdi/js'
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


// mdiCircle = Event
// mdiSquareOutline = Task
// mdiTriangle = Habit

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '15vw',
  },
});

class BulletNavigator extends React.Component {
  constructor(props)
  {
    super(props);

    this.createList = this.createList.bind(this);
  }

  createList(i)
  {
    return (
    <ListItem key={i}>
      <ListItemText
        onClick={(e) => this.props.changeSelectedMonth(i)} >
        {i}
      </ListItemText>
    </ListItem>
  )
  }

  render() {
    return(
      <div className={this.props.classes.root}>
        <List>
            {this.props.navigatorMonths.map(this.createList)}
        </List>
      </div>
    );
  }
}

BulletNavigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BulletNavigator);
