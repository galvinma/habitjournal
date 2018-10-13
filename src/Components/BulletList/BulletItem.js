import React from 'react'
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


// circle = Event
// square = Task
// triangle = Habit

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

  createList(i)
  {
    return (

      <ListItem>
          <ListItemIcon>
            <Icon path={i.selected} size={1} />
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
