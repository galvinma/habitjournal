import React from 'react'
import Icon from '@mdi/react'
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  calendar_title_containter: {
    marginTop: '8px',
    marginBottom: '8px',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70vw',
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

class Navs extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
    };
  }

  render() {
    return(
      <div>
        <div className={this.props.classes.calendar_title_containter}>
          <Icon class="calendar_navs" path={mdiChevronLeft} size={1} onClick={(e) => this.props.prevMonthHandler()}/>
            <div class="date_title">
              {this.props.displayMonthYear}
            </div>
          <Icon class="calendar_navs" path={mdiChevronRight} size={1} onClick={(e) => this.props.nextMonthHandler()}/>
        </div>
      </div>
    )
  }
}


Navs.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Navs);
