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
import {  mdiClose } from '@mdi/js'

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  close: {
    marginLeft: 'auto',
    padding: '10px',
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

  createList(i)
  {
    // console.log(this.props.entries_modal_id.entries_modal_id)
    // console.log(moment.unix(i.date).format('dddd, MMMM Do, YYYY'))
    if (moment.unix(i.date).format('dddd, MMMM Do, YYYY') === this.props.entries_modal_id.entries_modal_id)
    {
      return (
      <ListItem key={i}>
        <ListItemText>
          <Typography variant="body1">
            {i.title}
          </Typography>
        </ListItemText>
      </ListItem>
    )}
  }

  componentDidMount()
  {
    this.getMatch()
  }

  render() {
    return(
      <div>
        <Dialog open={this.props.entries_modal_status.entries_modal_status} onClose={this.props.handleModalClose}>
          <div>
            <Icon
              path={mdiClose}
              size={1}
              className={this.props.classes.close}
              onClick={() => this.props.handleModalClose("new")}/>
          </div>

          <DialogContent>
            <List>
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
