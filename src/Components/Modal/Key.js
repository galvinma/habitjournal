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
import Icon from '@mdi/react'
import {  mdiClose } from '@mdi/js'
// redux
import store from '../.././Store/store'
import { connect } from "react-redux";
import { getKeyModalState } from '../.././Actions/actions'

// Components
import KeyList from '.././Tabs/KeyList'

const styles = theme => ({
  close: {
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '10px',
    paddingBottom: '0px',
  },
  close_container: {
    textAlign: 'right',
  },
  title: {
    paddingTop: '0px',
  }
})

class Key extends React.Component {
  constructor(props)
  {
    super(props);
  }

  handleClose()
  {
    store.dispatch(getKeyModalState({key_modal_status: false}))
  };

  render() {
    return(
      <div>
        <Dialog open={this.props.key_modal_status.key_modal_status} onClose={this.handleClose}>
        <div className={this.props.classes.close_container}>
          <Icon
            path={mdiClose}
            size={1}
            className={this.props.classes.close}
            onClick={() => this.handleClose()}/>
        </div>
          <DialogTitle className={this.props.classes.title}>Key</DialogTitle>
          <KeyList/>
        </Dialog>
      </div>
    );
  }
}


Key.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    key_modal_status: state.key_modal_status,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Key));
