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
import Typography from '@material-ui/core/Typography';
import Icon from '@mdi/react'
import { mdiCheck, mdiClose, mdiPlus } from '@mdi/js'

import NewHabit from '../.././Components/Modal/NewHabit'

const styles = theme => ({
  calendar_row_container: {
    width: '90vw',
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: "center",
  },
  table_styles: {
    tableLayout: 'fixed',
  },
  cell_style: {
    textAlign: "center",
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: "0px",
    paddingBottom: "0px",
  },
  icon_style: {
    verticalAlign: 'middle',
  },
  habit_cell: {
    width: '10vw',
    textAlign: "left",
    alignItems: 'flex-start',
    paddingLeft: '25px',
    paddingRight: '0px',

    [theme.breakpoints.down(768)]: {
      width: '15vw',
    },

    [theme.breakpoints.down(500)]: {
      width: '20vw',
    },

  },
  month_header: {
    width: '100%',
  },
  header_style: {
    textAlign: "center",
    paddingLeft: '0px',
    paddingRight: '0px',
  },
  habit_name: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    textAlign: "left",
  },
});

class HabitsTable extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        width: 0,
        height: 0
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const header = [];
    const dates = [];
    const dates_shortstamp = []
    var count = 0;
    while (count < 7) {
      dates.push(String(moment(this.props.firstDayOfWeekDate).add(count,'day').format('dddd, MMMM Do, YYYY')))
      dates_shortstamp.push(String(moment(this.props.firstDayOfWeekDate).add(count,'day').format('YYYY-MM-DD')))

      if (this.state.width > 900)
      {
        header.push(
          <div key={this.props.firstDayOfWeekDate+count}>
            <p>{String(moment(this.props.firstDayOfWeekDate).add(count,'day').format('ddd, MMM Do'))}</p>
          </div>
        );
        count++
      }
      else if (this.state.width > 600)
      {
        header.push(
          <div key={this.props.firstDayOfWeekDate+count}>
            <p>{String(moment(this.props.firstDayOfWeekDate).add(count,'day').format('MMM Do'))}</p>
          </div>
        );
        count++
      }
      else if (this.state.width > 450)
      {
        header.push(
          <div key={this.props.firstDayOfWeekDate+count}>
            <p>{String(moment(this.props.firstDayOfWeekDate).add(count,'day').format('MM/DD'))}</p>
          </div>
        );
        count++
      }
      else
      {
        header.push(
          <div key={this.props.firstDayOfWeekDate+count}>
            <p style={{transform: "rotate(-45deg)"}}>{String(moment(this.props.firstDayOfWeekDate).add(count,'day').format('MM/DD'))}</p>
          </div>
        );
        count++
      }

    }

    return(
      <div>
        <Table className={this.props.classes.table_styles}>
          <TableHead>
            <TableRow>
              <TableCell key={"spacing"} className={this.props.classes.habit_cell}>
                  <Icon className={this.props.classes.icon_style} path={mdiPlus} size={0.85} onClick={() => this.props.handleModalOpen()}/>
              </TableCell>
              {header.map((item, index) => {
                return (
                    <TableCell key={"header"+index} className={this.props.classes.header_style}>
                      <Typography component="div" variant="body1" className={this.props.classes.month_header}>
                        {item}
                      </Typography>
                    </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.habits.map(row => {
              return (
                <TableRow key={row.title} id={row.habit_id}>
                  <TableCell className={this.props.classes.cell_style} component="th" scope="row">
                    <Typography component="div" variant="body1" className={this.props.classes.habit_name}>
                      {row.title}
                    </Typography>
                  </TableCell>
                  {dates.map((date, index) => {
                    return (
                        <TableCell
                            id={"cell"+row.habit_id+"_"+dates_shortstamp[index]}
                            className={this.props.classes.cell_style}
                            key={row+index}
                            onClick={(e) => this.props.toggleIcon(row.habit_id+"_"+dates_shortstamp[index])} >
                          <Icon
                            path={mdiClose}
                            size={0.75}
                            id={row.habit_id+"_"+dates_shortstamp[index]}
                            className={this.props.classes.icon_style} />
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
