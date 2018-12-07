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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import {  mdiClose } from '@mdi/js'
// redux
import store from '../.././Store/store'
import { connect } from "react-redux";
import { getArchiveModalState } from '../.././Actions/actions'

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

class Archive extends React.Component {
  constructor(props)
  {
    super(props);

    this.state = {
      value: 0,
      page: 0,
      rowsPerPage: 12,
    }

    this.createList = this.createList.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleChangePage = (event, page) => {
  this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  createList(i)
  {
    return (
    <TableRow key={i} className={this.props.classes.row_style}>
      <TableCell className={this.props.classes.cell_style} onClick={(e) => {
        this.props.changeSelectedMonth(i)
        this.handleClose()}}>
          {i}
      </TableCell>
    </TableRow>
    )
  }

  handleClose()
  {
    store.dispatch(getArchiveModalState({archive_modal_status: false}))
  };

  render() {
    const { classes, theme } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.navigatorMonths.length - page * rowsPerPage);
    return(
      <div>
        <Dialog open={this.props.archive_modal_status.archive_modal_status} onClose={this.handleClose}>
        <div className={this.props.classes.close_container}>
          <Icon
            path={mdiClose}
            size={1}
            className={this.props.classes.close}
            onClick={() => this.handleClose()}/>
        </div>
          <DialogTitle className={this.props.classes.title}>Archive</DialogTitle>
          <Table>
            <TableBody>
              {this.props.navigatorMonths
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(this.createList)}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[12]}
            component="div"
            count={this.props.navigatorMonths.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Dialog>
      </div>
    );
  }
}

Archive.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    archive_modal_status: state.archive_modal_status,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Archive));
