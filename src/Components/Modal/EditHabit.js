import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
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

class EditHabit extends React.Component {
  constructor(props)
  {
    super(props);
  }

  render() {
    return(
      <div>
        <Dialog open={this.props.editModalState} onClose={this.props.handleModalClose}>
          <DialogTitle id="simple-dialog-title">Edit Habit</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography variant="body1">Habit Title</Typography>
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="edithabit"
              fullWidth
              defaultValue={this.props.editValue}
              onChange={this.props.editModalValue}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.deleteHabit} color="primary">
              <Typography variant="body1">Delete</Typography>
            </Button>
            <Button onClick={this.props.handleModalClose} color="primary">
              <Typography variant="body1">Cancel</Typography>
            </Button>
            <Button onClick={this.props.updateHabit} color="primary">
              <Typography variant="body1">Confirm</Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}


EditHabit.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditHabit);
