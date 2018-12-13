import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";

const styles = theme => ({
  cell_style: {
    textAlign: "center",
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: "0px",
    paddingBottom: "0px",
    border: 'none',
  },
  row_style: {
    height: '36px',
    border: 'none',
  }
})


class ArchiveList extends React.Component {
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
      <TableCell className={this.props.classes.cell_style} onClick={(e) => this.props.changeSelectedMonth(i)}>
          {i}
      </TableCell>
    </TableRow>
    )
  }

  render() {
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.nav_months.nav_months.length - page * rowsPerPage);
    return (
      <div>
      <Table>
        <TableBody>
          {this.props.nav_months.nav_months
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(this.createList)}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[12]}
        component="div"
        count={this.props.nav_months.nav_months.length}
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

      </div>
  )}
}

ArchiveList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    nav_months: state.nav_months,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ArchiveList));
