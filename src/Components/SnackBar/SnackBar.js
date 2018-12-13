import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";
import { getSnackBarState, getSnackBarMessage } from '../.././Actions/actions'

const styles = theme => ({
  close: {
    padding: '8px',
  },
});

class SnackBar extends React.Component {
  handleClose = (event, reason) => {
    store.dispatch(getSnackBarState({snack_bar_state: false}))
    store.dispatch(getSnackBarMessage({snack_bar_message: ""}))
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.props.snack_bar_state.snack_bar_state}
          autoHideDuration={5000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.snack_bar_message.snack_bar_message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

SnackBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    snack_bar_state: state.snack_bar_state,
    snack_bar_message: state.snack_bar_message,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(SnackBar));
