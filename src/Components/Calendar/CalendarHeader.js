import React from 'react'
import moment from 'moment'
import Icon from '@mdi/react'
import { mdiChevronLeft, mdiChevronRight, mdiPlus } from '@mdi/js'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Components
import CalendarEvent from '.././Modal/CalendarEvent'

const styles = theme => ({
  calendar_title_containter: {
    marginBottom: '2vh',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    width: '70vw',
  },
  calendar_title: {
    fontSize: '2em',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  calendar_navs: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  add_event: {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginLeft: 'auto',
  },
});

class CalendarHeader extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      modalOpen: false,
    };
    this.createEvent = this.createEvent.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  createEvent() {
    this.setState({ modalOpen: true });
  }
  closeModal() {
    this.setState({ modalOpen: false });
  }

  render() {
    return(
      <div>
        <div className={this.props.classes.calendar_title_containter}>
          <Icon className={this.props.classes.calendar_navs} path={mdiChevronLeft} size={1.5} onClick={(e) => this.props.prevMonthHandler()}/>
          <div className={this.props.classes.calendar_title}>{this.props.displayMonthYear} </div>
          <Icon className={this.props.classes.calendar_navs} path={mdiChevronRight} size={1.5} onClick={(e) => this.props.nextMonthHandler()}/>
          <Icon className={this.props.classes.add_event} path={mdiPlus} size={1.25} onClick={this.createEvent} />
        </div>
        <CalendarEvent modalOpen={this.state.modalOpen}/>
      </div>
    );
  }
}


CalendarHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(CalendarHeader);
