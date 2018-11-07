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
import Typography from '@material-ui/core/Typography';
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
    marginTop: '3px',
    marginBottom: '8px',
  },
  formControl: {
    margin: theme.spacing.unit,
    flexDirection: 'row',
  },
  bulletRow: {
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  bulletItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text_input: {
    maxWidth: '55vw',
    minWidth: '40vw',
    border:'none',
    outline: 'none',
  },
  date_title: {
    paddingBottom: '5px',
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
    edit_value: '',
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

    if (i.type === 'appointment' && i.status === "0")
    {
      return mdiTriangleOutline
    }

    if (i.type === 'appointment' && i.status === "1")
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
          <div className={this.props.classes.bulletItem}>
             <ListItemIcon>
                <Button onClick={(e) => this.props.toggleIcon(i.bullet_id, i.type, i.status)}>
                  <Icon path={p} size={0.75} />
                </Button>
             </ListItemIcon>

             <form>
               <Typography variant="body1">
                  <input onChange={(e) => {this.props.updateBulletDescription(i.bullet_id, e.target.value)}}
                  className={this.props.classes.text_input}
                  type="text"
                  id={i.bullet_id}
                  defaultValue={i.description} />
               </Typography>
             </form>

             <ListItemIcon>
               <Icon
                className="bullet-delete"
                path={mdiClose}
                size={0.75}
                onClick={(e) => this.props.removeBullet(i.bullet_id)} />
             </ListItemIcon>

           </div>
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
                  <Typography variant="body1" className={this.props.classes.date_title}>
                    {k}
                  </Typography>
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
