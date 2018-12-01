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
import { mdiCheck, mdiClose, mdiPlus, mdiDotsVertical, mdiChevronLeft, mdiChevronRight} from '@mdi/js'

// Components
import NewHabit from '../.././Components/Modal/NewHabit'

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";

const styles = theme => ({
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
  chevron_container: {
    display: "inline-block",
    marginLeft: "auto",
  },
  habit_cell: {
    display: 'flex',
    flexDirection: "row",
    textAlign: "center",
    alignItems: 'center',
    height: '56px',
  },
  edit_cell: {
    textAlign: "center",
    alignItems: 'flex-start',
    paddingLeft: '0px',
    paddingRight: '0px',
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
    textAlign: "center",
  },
})

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
              <TableCell className={this.props.classes.cell_style}>
                  <Icon className={this.props.classes.icon_style} path={mdiPlus} size={0.85} onClick={() => this.props.handleModalOpen("new")}/>
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
              <TableCell className={this.props.classes.edit_cell}>
                <div className={this.props.classes.chevron_container}>
                  <Icon
                    className={this.props.classes.icon_style}
                    path={mdiChevronLeft}
                    size={0.85}
                    onClick={(e) => this.props.prevWeekHandler()}/>
                  <Icon
                    className={this.props.classes.icon_style}
                    path={mdiChevronRight}
                    size={0.85}
                    onClick={(e) => this.props.nextWeekHandler()}/>
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.habits.map(row => {
              return (
                <TableRow key={row.title} id={row.habit_id}>
                  <TableCell className={this.props.classes.cell_style} component="th" scope="row">
                    <Typography id={"title"+row.habit_id} variant="body1" className={this.props.classes.habit_name}>
                      {row.title}
                    </Typography>
                  </TableCell>
                  {dates.map((date, index) => {
                    return (
                        <TableCell
                            id={"cell"+row.habit_id+"_"+dates_shortstamp[index]}
                            className={this.props.classes.cell_style}
                            key={row.title+index+date}
                            onClick={(e) => {
                              this.props.logHabit(row.habit_id+"_"+dates_shortstamp[index])
                              this.props.softUpdateHabitEntries(row.habit_id+"_"+dates_shortstamp[index])
                              }}>
                          <Icon
                            key={row.title+index+"icon"+date}
                            value="0"
                            path={mdiClose}
                            size={0.75}
                            id={row.habit_id+"_"+dates_shortstamp[index]}
                            className={this.props.classes.icon_style} />
                        </TableCell>
                    )
                  })}
                  <TableCell className={this.props.classes.cell_style} component="th" scope="row">
                    <Typography component="div" variant="body1" className={this.props.classes.cell_style}>
                    <Icon
                      key={row.title+"dots"}
                      path={mdiDotsVertical}
                      value={row.title}
                      size={0.75}
                      className={this.props.classes.icon_style}
                      onClick={() => this.props.handleModalOpen("edit", row.habit_id, row.title)} />
                    </Typography>
                  </TableCell>
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

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps)(withStyles(styles)(HabitsTable));
