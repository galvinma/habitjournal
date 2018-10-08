import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class CalendarEvent extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
    };
  }

  render() {
    return(
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.modalOpen}
          onClose={this.handleClose}
        >
          <div className={this.props.classes.paper}>
            <Typography variant="h6" id="modal-title">
              Text in a modal
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </div>
        </Modal>
      </div>
    );
  }
}


CalendarEvent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CalendarEvent);
