import React from 'react'
import moment from 'moment'
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@mdi/react'
import Typography from '@material-ui/core/Typography';
import ReactSVG from 'react-svg'
import {  mdiClose,
          mdiDotsHorizontal } from '@mdi/js'


// redux
import store from '../.././Store/store'
import { connect } from "react-redux";
import { getEntriesModalState, getEntriesModalID, getEditEntriesModalState, getCurrentEntry } from '../.././Actions/actions'


// functions
import { convertToIcon } from '../.././Utils/convertoicon'

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
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  close: {
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '10px',
    paddingBottom: '0px',
  },
  close_container: {
    textAlign: 'right',
  },
  entries_icon: {
    display: 'inline-block',
    verticalAlign: 'sub',
    paddingRight: '2px',
    paddingLeft: '0px',
  },
  list_item_container: {
    display: 'flex',
    flexDirection: 'row',
  },
});

class CalendarEntries extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      entries: [],
    }

    this.getMatch = this.getMatch.bind(this)
    this.createList = this.createList.bind(this)
    this.convertToIcon = convertToIcon.bind(this);
    this.dispatchEditModal = this.dispatchEditModal.bind(this)

  }

  getMatch()
  {
    axios.post('http://127.0.0.1:5002/api/return_entries', {
      params: {
        user: sessionStorage.getItem('user'),
      }
    })
    .then((response) => {
      var res = response.data.entries
      this.setState({
        entries: response.data.entries
      })
    })
  }

  dispatchEditModal(entry_id, type, status)
  {
    if (type !== 'habit')
    {
      store.dispatch(getEntriesModalState({
        entries_modal_status: false
      }))

      axios.post('http://127.0.0.1:5002/api/return_one', {
        params: {
          user: sessionStorage.getItem('user'),
          entry_id: entry_id
        }
      })
      .then((response) => {

        store.dispatch(getEntriesModalID({
          entries_modal_id: entry_id
        }))

        store.dispatch(getCurrentEntry({
          current_entry: response.data.entry
        }))

        store.dispatch(getEditEntriesModalState({
          edit_entries_modal_status: true
        }))
      })
    }
  }

  createList(i)
  {
    var p = this.convertToIcon(i)
    var salt = Math.random()*1000
    console.log(moment.unix(i.start_date).format('dddd, MMMM Do, YYYY'))
    console.log(i.title)
    console.log(" ")
    if (moment.unix(i.start_time).format('dddd, MMMM Do, YYYY') === this.props.entries_modal_id.entries_modal_id &&
        i.type !== 'note')
    {
      return (
      <ListItem key={i+salt}>
        <ListItemText>
            <div className={this.props.classes.list_item_container}>
              <ReactSVG
                className={this.props.classes.entries_icon}
                src={p}
                svgStyle={{ height: '20px' }} />
              <div onClick={() => this.dispatchEditModal(i.entry_id, i.type, i.status)}>
                <Typography variant="body1">{i.title}</Typography>
              </div>
            </div>
        </ListItemText>
      </ListItem>
    )}
  }

  render() {
    return(
      <div>
        <Dialog onEnter={this.getMatch} open={this.props.entries_modal_status.entries_modal_status} onClose={this.props.handleModalClose}>
          <div className={this.props.classes.close_container}>
            <Icon
              path={mdiClose}
              size={1}
              className={this.props.classes.close}
              onClick={() => this.props.handleModalClose("view")}/>
          </div>
          <DialogTitle>
            {this.props.entries_modal_id.entries_modal_id}
          </DialogTitle>
          <DialogContent>
            <List dense={true}>
                {this.state.entries.map(this.createList)}
            </List>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

CalendarEntries.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    entries_modal_status: state.entries_modal_status,
    entries_modal_id: state.entries_modal_id
  }
}

export default connect(mapStateToProps)(withStyles(styles)(CalendarEntries));
