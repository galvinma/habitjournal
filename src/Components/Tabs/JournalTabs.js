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

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

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
    width: '125px',
    minWidth: '0px',
    fontWeight: '600',
    textTransform: 'none',
  },
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
    const { classes, theme } = this.props;
    const { value, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.nav_months.nav_months.length - page * rowsPerPage);
    return (
      <div className={this.props.classes.root}>
        <AppBar position="static" color="default" className={this.props.classes.app_bar}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Archive" classes={{root: this.props.classes.tabRoot}}/>
            <Tab label="Key" classes={{root: this.props.classes.tabRoot}} />
          </Tabs>
        </AppBar>
          { value === 0 && <TabContainer className={this.props.classes.month} dir={theme.direction}>
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
          </TabContainer>}
          {value === 1 && <TabContainer dir={theme.direction}>
            <KeyList />
          </TabContainer>}
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
