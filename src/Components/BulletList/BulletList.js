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
import ReactSVG from 'react-svg'

// functions
import { toggleIcon } from '../.././Utils/toggleicon'
import { convertToIcon } from '../../Utils/convertoicon'

// CSS
import './BulletList.css'

// Images and Icons
var minus = require('../.././Images/Icons/minus.svg')
var checkboxBlankCircleOutline = require('../.././Images/Icons/checkbox-blank-circle-outline.svg')
var checkboxBlankCircle = require('../.././Images/Icons/checkbox-blank-circle.svg')
var checkboxBlankOutline = require('../.././Images/Icons/checkbox-blank-outline.svg')
var checkboxBlankTriangleOutline = require('../.././Images/Icons/checkbox-blank-triangle-outline.svg')
var checkboxBlankTriangle = require('../.././Images/Icons/checkbox-blank-triangle.svg')
var checkboxBlank = require('../.././Images/Icons/checkbox-blank.svg')
var checkboxMultipleBlankCircleOutline = require('../.././Images/Icons/checkbox-multiple-blank-circle-outline.svg')
var checkboxMultipleBlankCircle = require('../.././Images/Icons/checkbox-multiple-blank-circle.svg')
var checkboxMultipleBlankOutline = require('../.././Images/Icons/checkbox-multiple-blank-outline.svg')
var checkboxMultipleBlankTriangleOutline = require('../.././Images/Icons/checkbox-multiple-blank-triangle-outline.svg')
var checkboxMultipleBlankTriangle = require('../.././Images/Icons/checkbox-multiple-blank-triangle.svg')
var checkboxMultipleBlank = require('../.././Images/Icons/checkbox-multiple-blank.svg')
var flowerOutline = require('../.././Images/Icons/flower-outline.svg')
var flower = require('../.././Images/Icons/flower.svg')

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
    background: 'transparent',
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
  constructor(props)
  {
    super(props);
    this.state = {
      count: 0,
      edit_value: '',
    };

    this.createList = this.createList.bind(this);
    this.convertToIcon = convertToIcon.bind(this);
    this.toggleIcon = toggleIcon.bind(this);
  }

  createList(i)
   {
     var p = this.convertToIcon(i)
     var entry_times
     var start
     var end

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
                 key={i.entry_id+i.type+i.start_time}
                 className={this.props.classes.timeInput}
                 style={{ width: '50px' }}
                 value={moment.unix(i.start_time)}
                 onChange={(e) => this.props.updateBulletTimes(i.entry_id, e, "start_time")}
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
                 key={i.entry_id+i.type+i.end_time}
                 className={this.props.classes.timeInput}
                 style={{ width: '50px'}}
                 value={moment.unix(i.end_time)}
                 onChange={(e) => this.props.updateBulletTimes(i.entry_id, e, "end_time")}
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
       <div key={i.entry_id+i.status}>
       <ListItem className={this.props.classes.bulletRow_sel}>
        <div className="bullet-item">
          <div className={this.props.classes.bulletItem}>
             <ListItemIcon className={this.props.classes.list_selector}>
                <Button onClick={(e) => {
                  toggleIcon(i.entry_id, i.type, i.status)
                  .then((response) => this.props.getBullets())
                  .catch((error) => console.log(error))
                  }}>
                  <ReactSVG src={p} svgStyle={{ height: '20px' }}/>
                </Button>
             </ListItemIcon>

             <form>
                <input
                key={i.entry_id+i.type+i.title}
                onChange={(e) => {this.props.updateBulletTitle(i.entry_id, e.target.value)}}
                onBlur={this.props.blurHandler}
                className={this.props.classes.text_input}
                type="text"
                id={i.entry_id}
                defaultValue={i.title} />
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
            <List key={k} className={this.props.classes.list_container}>
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
