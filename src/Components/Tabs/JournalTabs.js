import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";

// Components
import KeyList from './KeyList'

// CSS
import './JournalTabs.css'

const styles = theme => ({
  app_bar:
  {
    backgroundColor: '#ffffff',
    borderRadius: '4px',

  },
  icon: {
    paddingLeft: '5px',
    paddingRight: '15px',
  },
  icon_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flexStart',
    alignItems: 'center',
  },
  tabRoot: {
    fontFamily:'Nunito',
    fontWeight: '600',
    fontSize: '14px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    minHeight: '32px',
    width: '100%',
    minWidth: '0px',
    textTransform: 'none',
  },
  tab_text: {
    display: 'inline-block'
  },
  cell_style: {
    fontFamily:'Nunito',
    fontWeight: '500',
    fontSize: '14px',
    textAlign: "center",
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: "0px",
    paddingBottom: "0px",
    border: 'none',
  },
  month: {
    marginTop: '16px',
    textAlign: 'center',
    width: '100%',
  },
  pagination: {
    padding: '0px',
  },
  row_style: {
    height: '32px',
    border: 'none',
  }
});

class JournalTabs extends React.Component {
  constructor(props)
  {
    super(props);

    this.state = {
      value: 0,
      page: 0,
      rowsPerPage: 12,
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });

    if (value === 0)
    {
      document.getElementById("archive").style.textDecoration = "underline"
      document.getElementById("key").style.textDecoration = "none"
    }
    else
    {
      document.getElementById("key").style.textDecoration = "underline"
      document.getElementById("archive").style.textDecoration = "none"
    }
  }

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleChangePage = (event, page) => {
  this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, theme } = this.props;
    const { value, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.nav_months.nav_months.length - page * rowsPerPage);
    return (
      <div className={this.props.classes.root}>
        <AppBar position="static" color="default" className={this.props.classes.app_bar}>
          <div className={this.props.classes.tabRoot}>
            <div id="archive" classes={{root: this.props.classes.tab_text}}
                  onClick={(e) => this.handleChange(e,0)}>Archive</div>
            <div id="key" classes={{root: this.props.classes.tab_text}}
                  onClick={(e) => this.handleChange(e,1)}>Key</div>
          </div>
        </AppBar>
          { value === 0 && <div dir={theme.direction}>
              <table className={this.props.classes.month}>
                  {this.props.nav_months.nav_months
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((i, index) => (
                    <tr key={i+index} className={this.props.classes.row_style}>
                      <td className={this.props.classes.cell_style} onClick={(e) => this.props.changeSelectedMonth(i)}>
                          {i}
                      </td>
                    </tr>
                  ))
                  }
              </table>
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
                className={this.props.classes.pagination}
              />
          </div>}
          {value === 1 && <div dir={theme.direction}>
            <div className={this.props.classes.month}>
            <KeyList />
            </div>
          </div>}
      </div>
    );
  }
}


JournalTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    nav_months: state.nav_months,
  }
}

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(JournalTabs));
;
