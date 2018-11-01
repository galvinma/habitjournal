import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import NewHabit from '../.././Components/Modal/NewHabit'

const styles = theme => ({
  calendar_row_container: {
    width: '90vw',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

});

class HabitsTable extends React.Component {
  componentDidMount()
  {
    this.props.getHabits()
  }

  render() {

    const header = [];
    var count = 0;
    while (count < 7) {
      header.push(
        <div key={this.props.firstDayOfWeekDate+count}>
          <p>{String(moment(this.props.firstDayOfWeekDate).add(count,'day').format('dddd, MMMM Do, YYYY'))}</p>
        </div>
      );
      count++
    }

    return(
      <div>
        <Button
          fullWidth
          onClick={() => this.props.handleModalOpen()}
        >Create Habit</Button>
        <Table>
          <TableHead>
            <TableRow key={'tableheader'}>
              {header.map(item => {
                return (
                    <TableCell key={item}>
                      {item}
                    </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>

          </TableBody>
        </Table>
      </div>
    )
  }
}

HabitsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(HabitsTable);
