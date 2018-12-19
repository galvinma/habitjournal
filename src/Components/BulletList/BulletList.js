import React from 'react'
import moment from 'moment'
import MomentUtils from '@date-io/moment'
import PropTypes from 'prop-types';
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

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";

// functions
import { convertToIcon } from '../../Utils/convertoicon'

// CSS
import './BulletList.css'

// Images/Icons
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
var key = require('../.././Images/Icons/key.svg')
var archive = require('../.././Images/Icons/archive.svg')
var logo = require('../.././Images/logo.svg')
var close = require('../.././Images/Icons/close.svg')
var weatherNight = require('../.././Images/Icons/weather-night.svg')
var weatherSunset = require('../.././Images/Icons/weather-sunset.svg')

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
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    fontFamily:'Nunito',
    fontWeight: '500',
    fontSize: '11px',
    paddingTop: '0px',
    paddingBottom: '8px',
  },
  bulletRow_sel: {
    paddingTop: '0px',
    paddingBottom: '0px',
    paddingLeft: '0px',
    marginBottom: '8px',
    marginLeft: '16px',
  },
  bulletItem: {
    display: 'flex',
    alignItems: 'end',
    flexDirection: 'row',
    fontFamily:'Nunito',
    fontSize: '11px',
  },
  text_input: {
    resize: 'none',
    minWidth: 'calc(100vw - 460px);',
    border:'none',
    outline: 'none',
    background: 'transparent',
    fontFamily:'Nunito Sans',
    fontSize: '11px',
    height: '16px',
    marginLeft: '2px',
  },
  date_title: {
    fontFamily:'Nunito',
    fontWeight: '500',
    fontSize: '14px',
    marginBottom: '8px',
  },
  date_container: {
    marginBottom: '16px',
  },
  timepicker_list_style: {
    fontFamily:'Nunito',
    fontWeight: '500',
  },
  list_selector:
  {
    marginRight: '8px',
  },
  list_container: {
    paddingTop: '2px',
    paddingBottom: '2px',
  },
  icon_style: {
    height: '18px',
  }
});

class BulletList extends React.Component {
  constructor(props)
  {
    super(props);

    this.convertToIcon = convertToIcon.bind(this);
  }

  render() {
    return(
      <div className={this.props.classes.root}>
      <div className={this.props.classes.list_container}>
        {
         Object.keys(this.props.journal_entries.journal_entries).map((k, index) => (
                  <div className={this.props.classes.date_container} key={k+index}>
                    <div className={this.props.classes.date_title}>{k}</div>
                  {
                    this.props.journal_entries.journal_entries[k].map((i, ind) => (
                    <div key={i+ind} className={this.props.classes.bulletRow_sel}>
                      <div className="bullet-item">
                       <div className={this.props.classes.bulletItem}>
                         <div onClick={(e) => {this.props.toggleIcon(i.entry_id, i.type, i.status)}}>
                           <img src={this.convertToIcon(i)} className={this.props.classes.icon_style}/>
                         </div>

                         <input
                         rows="1"
                         key={i.title}
                         onBlur={(e) => {this.props.updateBulletTitle(i.entry_id, e.target.value)}}
                         className={this.props.classes.text_input}
                         type="text"
                         id={i.entry_id}
                         defaultValue={i.title} />

                        <img
                         className="bullet-delete"
                         src={close}
                         onClick={(e) => this.props.removeEntry(i.entry_id)} />
                        </div>
                      </div>

                        {(()=>{
                        var start
                        var end
                        var entry_times

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
                            <img src={weatherSunset} className={this.props.classes.icon_style}/>
                          }
                          else
                          {
                            start =
                                 <div className={this.props.classes.timeInput}>
                                   {moment.unix(i.start_time).format('h:mm a')}
                                 </div>
                          }

                          if (moment.unix(i.end_time).endOf('day').unix() === moment.unix(i.end_time).unix())
                          {
                            end =
                            <img src={weatherNight}  className={this.props.classes.icon_style}/>
                          }
                          else
                          {
                            end =
                            <div className={this.props.classes.timeInput}>
                              {moment.unix(i.end_time).format('h:mm a')}
                            </div>
                          }

                          return(
                            entry_times =
                            <div className={this.props.classes.timeRow}>
                               {start}
                              <div class="to_style">to</div>
                               {end}
                            </div>
                          )
                          }

                        })()}
                      </div>

                  ))
                }
              </div>
            ))
        }
        </div>
      </div>
    )}
}

BulletList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    journal_entries: state.journal_entries,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(BulletList));
