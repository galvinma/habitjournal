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
import Icon from '@mdi/react'
import { mdiCheck, mdiClose } from '@mdi/js'

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
  constructor(props){
    super(props);

  }

  componentDidMount()
  {

    console.log(this.props.habit_entries)
    this.props.habit_entries.forEach(entry =>
    {
      var id = entry.habit_id+"_"+moment.unix(entry.date).format('YYYY-MM-DD')
      console.log(id)
    })
  }

  render() {
    const header = [];
    const dates = [];
    const dates_shortstamp = []
    var count = 0;
    while (count < 7) {
      dates.push(String(moment(this.props.firstDayOfWeekDate).add(count,'day').format('dddd, MMMM Do, YYYY')))
      dates_shortstamp.push(String(moment(this.props.firstDayOfWeekDate).add(count,'day').format('YYYY-MM-DD')))
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
            <TableRow>
              <TableCell key={"spacing"}></TableCell>
              {header.map((item, index) => {
                return (
                    <TableCell key={"header"+index}>
                      {item}
                    </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.habits.map(row => {
              return (
                <TableRow key={row.name} id={row.habit_id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  {dates.map((date, index) => {
                    return (
                        <TableCell
                            id={"cell"+row.habit_id+"_"+dates_shortstamp[index]}
                            key={row+index}
                            onClick={(e) => this.props.toggleIcon(row.habit_id+"_"+dates_shortstamp[index])} >
                          <Icon
                            path={mdiClose}
                            size={0.75}
                            id={row.habit_id+"_"+dates_shortstamp[index]} />
                        </TableCell>
                    )
                  })}
                </TableRow>
              );
            })}
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
