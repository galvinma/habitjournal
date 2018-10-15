import React from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';
import Icon from '@mdi/react'
import {  mdiSquare,
          mdiSquareOutline,
          mdiCircle,
          mdiCircleOutline,
          mdiTriangle,
          mdiTriangleOutline
        } from '@mdi/js'
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  formControl: {
    margin: theme.spacing.unit,
    flexDirection: 'row',
  },
});

class BulletItem extends React.Component {
  constructor(props){
  super(props);

  this.convertType = this.convertType.bind(this);
  this.createList = this.createList.bind(this);

  }

  convertType(i)
  {
    // mdiCircleOutline = Event
    // mdiSquareOutline = Task
    // mdiTriangleOutline = Habit
    if (i === 'event')
    {
      return mdiCircleOutline
    }
    if (i === 'task')
    {
      return mdiSquareOutline
    }
    if (i === 'habit')
    {
      return mdiTriangleOutline
    }
  }

  createList(i)
  {
    var p = this.convertType(i.type)
    return (
      <ListItem>
          <ListItemIcon>
            <Icon path={p} size={1} />
          </ListItemIcon>
          <ListItemText primary={i.description} />
        </ListItem>
    )
  }

  render() {
    var bullets = this.props.bullets.map(this.createList)

    return(
      <div className={this.props.classes.root}>
        <List>
          {bullets}
        </List>
      </div>
    );
  }
}

BulletItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BulletItem);
