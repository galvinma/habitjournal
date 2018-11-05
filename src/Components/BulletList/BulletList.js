import React from 'react'
import PropTypes from 'prop-types';
import Icon from '@mdi/react'
import {  mdiSquare,
          mdiSquareOutline,
          mdiCircle,
          mdiCircleOutline,
          mdiTriangle,
          mdiTriangleOutline,
          mdiMinus,
          mdiClose,
        } from '@mdi/js'
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';

import './BulletList.css'

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
  bulletRow: {
    paddingTop: '0px',
    paddingBottom: '0px',
  },
});

class BulletList extends React.Component {
  constructor(props){
  super(props);
  this.state = {
    bullets: this.props.bullets,
    description: this.props.description,
    type: this.props.type,
    selected: this.props.selected,
    count: 0,
  };

  this.convertType = this.convertType.bind(this);
  this.createList = this.createList.bind(this);

  }

  convertType(i)
  {
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

    if (i.type === 'note')
    {
      return mdiMinus
    }

  }

  createList(i)
   {
     var p = this.convertType(i)
     return (
       <ListItem key={i.bullet_id} className={this.props.classes.bulletRow}>
        <div className="bullet-item">
           <ListItemIcon>
              <Button onClick={(e) => this.props.toggleIcon(i.bullet_id, i.type, i.status)}>
                <Icon path={p} size={0.75} />
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
              className="bullet-delete"
              path={mdiClose}
              size={0.75}
              onClick={(e) => this.props.removeBullet(i.bullet_id)} />
           </ListItemIcon>
           </div>
         </ListItem>
   )
  }

  render() {
    return(
      <div className={this.props.classes.root}>
        {
         Object.keys(this.props.bullets).map((k, index) => (
            <List key={index}>
              <div className={this.props.classes.list_container}>
                  {k}
                  {this.props.bullets[k].map(this.createList)}
              </div>
            </List>
            ))
        }
      </div>
    )}
}

BulletList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BulletList);
