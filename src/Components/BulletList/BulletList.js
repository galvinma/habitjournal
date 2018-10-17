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
import Button from '@material-ui/core/Button';


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
    if (i.type === 'event' && i.status === "0")
    {
      return mdiCircleOutline
    }

    if (i.type === 'event' && i.status === "1")
    {
      return mdiCircle
    }

    if (i.type === 'task' && i.status === "0")
    {
      return mdiSquareOutline
    }

    if (i.type === 'task' && i.status === "1")
    {
      return mdiSquare
    }

    if (i.type === 'habit'&& i.status === "0")
    {
      return mdiTriangleOutline
    }

    if (i.type === 'habit'&& i.status === "1")
    {
      return mdiTriangle
    }

  }

  createList(i)
   {
     var p = this.convertType(i)
     return (
       <ListItem>
           <ListItemIcon>
              <Button onClick={(e) => this.props.toggleIcon(i.bullet_id, i.type, i.status)}>
                <Icon path={p} size={1} />
              </Button>
           </ListItemIcon>

           <TextField
              id={i.bullet_id}
              margin="normal"
              style={{width: '50vw'}}
              defaultValue={i.description}
              onChange={(e) => this.props.updateBulletDescription(i.bullet_id)}
           />
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
        <List>
        {
           Object.keys(this.props.bullets).map((key, index) => (
                <div className={this.props.classes.list_container}>
                    {key}
                    {this.props.bullets[key].map(this.createList)}
                </div>
              ))
        }
        </List>
      </div>
    )}

}

BulletItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BulletItem);
