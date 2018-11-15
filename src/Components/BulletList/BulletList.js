import React from 'react'
import moment from 'moment'
import MomentUtils from '@date-io/moment'
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
          mdiClockStart,
          mdiClockEnd,
          mdiWeatherSunset,
          mdiWeatherNight,
        } from '@mdi/js'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { TimePicker } from 'material-ui-pickers';
import { DatePicker } from 'material-ui-pickers';

// functions
import { toggleIcon } from '../.././Utils/toggleicon'

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
  timeRow: {
    paddingTop: '0px',
    paddingBottom: '12px',
  },
  bulletRow_sel: {
    paddingTop: '0px',
    paddingBottom: '0px',
    paddingLeft: '0px',
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
  timepicker_list_style: {
    fontSize: '11px',
  },
  list_selector:
  {
    marginRight: '8px',
  },
  list_container: {
    paddingTop: '2px',
    paddingBottom: '2px',
  },
});

class BulletList extends React.Component {
  constructor(props){
  super(props);
  this.state = {
    bullets: this.props.bullets,
    title: this.props.title,
    type: this.props.type,
    selected: this.props.selected,
    count: 0,
    edit_value: '',
  };

  this.convertType = this.convertType.bind(this);
  this.createList = this.createList.bind(this);
  this.toggleIcon = toggleIcon.bind(this);

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
     var entry_times
     var start
     var end

      console.log(moment.unix(i.start_time).startOf('day').unix())
      console.log(moment.unix(i.start_time).unix())

     if (moment.unix(i.start_time).startOf('day').unix() === moment.unix(i.start_time).unix() &&
     moment.unix(i.end_time).endOf('day').unix() === moment.unix(i.end_time).unix())
     {
       entry_times = null
     }
     else
     {
       if (moment.unix(i.start_time).startOf('day').unix() === moment.unix(i.start_time).unix())
       {
         start =
         <Icon path={mdiWeatherSunset} size={0.75} />
       }
       else
       {
         start =
         <Typography variant="body1">
           <MuiPickersUtilsProvider utils={MomentUtils}>
               <TimePicker
                 className={this.props.classes.timeInput}
                 style={{ width: '50px' }}
                 value={moment.unix(i.start_time)}
                 onChange={(e) => this.props.timeChange(e, "start")}
                 InputProps={{
                 classes: {
                     input: this.props.classes.timepicker_list_style,
                   }
                 }}/>
           </MuiPickersUtilsProvider>
         </Typography>
       }

       if (moment.unix(i.end_time).endOf('day').unix() === moment.unix(i.end_time).unix())
       {
         end =
         <Icon path={mdiWeatherNight} size={0.75} />
       }
       else
       {
         end =
         <Typography variant="body1">
           <MuiPickersUtilsProvider utils={MomentUtils}>
               <TimePicker
                 className={this.props.classes.timeInput}
                 style={{ width: '50px'}}
                 value={moment.unix(i.end_time)}
                 onChange={(e) => this.props.timeChange(e, "end")}
                 InputProps={{
                 classes: {
                     input: this.props.classes.timepicker_list_style,
                   }
                 }}/>
           </MuiPickersUtilsProvider>
         </Typography>
       }

         entry_times =
         <ListItem className={this.props.classes.timeRow}>
            {start}
           <div class="to_style">to</div>
            {end}
         </ListItem>
       }

     return (
       <div key={i.entry_id}>
       <ListItem className={this.props.classes.bulletRow_sel}>
        <div className="bullet-item">
          <div className={this.props.classes.bulletItem}>
             <ListItemIcon className={this.props.classes.list_selector}>
                <Button onClick={(e) => {
                  toggleIcon(i.entry_id, i.type, i.status)
                  .then((response) => this.props.getBullets())
                  .catch((error) => console.log(error))
                  }}>
                  <Icon path={p} size={0.75} />
                </Button>
             </ListItemIcon>

             <form>
               <Typography variant="body1">
                  <input onChange={(e) => {this.props.updateBulletTitle(i.entry_id, e.target.value)}}
                  className={this.props.classes.text_input}
                  type="text"
                  id={i.entry_id}
                  defaultValue={i.title} />
               </Typography>
             </form>

             <ListItemIcon>
               <Icon
                className="bullet-delete"
                path={mdiClose}
                size={0.75}
                onClick={(e) => this.props.removeBullet(i.entry_id)} />
             </ListItemIcon>

           </div>
         </div>
       </ListItem>
       {entry_times}
      </div>
   )
  }

  render() {
    return(
      <div className={this.props.classes.root}>
        {
         Object.keys(this.props.bullets).map((k, index) => (
            <List key={index} className={this.props.classes.list_container}>
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
