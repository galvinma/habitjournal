import React from 'react'
import axios from 'axios';
import moment from 'moment'
import PropTypes from 'prop-types';
import Icon from '@mdi/react'
import {  mdiSquare,
          mdiSquareOutline,
          mdiCircle,
          mdiCircleOutline,
          mdiTriangle,
          mdiTriangleOutline,
          mdiClose,
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
    flexDirection: 'column',
  },
  list_container: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  formControl: {
    margin: theme.spacing.unit,
    flexDirection: 'row',
  },
});

class BulletItem extends React.Component {
  constructor(props){
  super(props);
  this.state = {
    bullets: this.props.bullets,
    description: this.props.description,
    type: this.props.type,
    selected: this.props.selected,
  };

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
       <ListItem id={i.bullet_id}>
           <ListItemIcon>
             <Icon path={p} size={1} />
           </ListItemIcon>
           <ListItemText primary={i.description} />
           <ListItemIcon>
             <Icon
              path={mdiClose}
              size={1}
              onClick={(e) => this.props.removeBullet(i.bullet_id)} />
           </ListItemIcon>
         </ListItem>
   )
  }

  render() {
    return(
      <div className={this.props.classes.root}>
        {
           Object.keys(this.props.bullets).map((key, index) => (
                <div className={this.props.classes.list_container}>
                    {key}
                    {this.props.bullets[key].map(this.createList)}
                </div>
              ))
        }
      </div>
    )}

}

BulletItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BulletItem);
