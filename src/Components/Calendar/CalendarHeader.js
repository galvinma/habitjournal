import React from 'react'
import moment from 'moment'
import Icon from '@mdi/react'
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  calendar_title: {
    fontSize: '2em',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  calendar_navs: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
});

class CalendarHeader extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {

    };
  }

  render() {
    return(
      <div>
        <Icon className={this.props.classes.calendar_navs} path={mdiChevronLeft} size={1.5} />
        <div className={this.props.classes.calendar_title}>{this.props.getMonth}</div>
        <Icon className={this.props.classes.calendar_navs} path={mdiChevronRight} size={1.5} />
      </div>
    );
  }
}


CalendarHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(CalendarHeader);
