import React from 'react'
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  calendar_row_container: {
    width: '90vw',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  typo_width: {
    width: '12.8vw',
  },
  calendar_header_names: {
    flexGrow: 1,
    textAlign: 'left',
    width: '12.8vw',
    maxWidth: '12.8vw',
    height: '5vh',
  },
  hidden: {
    visibility: "hidden",
  },
});

class CalendarHeader extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      width: window.innerWidth,
      nameHeaders: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    };

    this.updateCalendarHeader = this.updateCalendarHeader.bind(this)
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWidth.bind(this))
  }

  componentWillUnmount()
  {
    window.removeEventListener("resize", this.updateWidth.bind(this))
  }

  updateWidth()
  {
    this.setState({
      width: window.innerWidth
    })

    if (window.innerWidth > 768)
    {
      this.setState({
        nameHeaders: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
      })
    }
    else if (window.innerWidth > 500)
    {
      this.setState({
        nameHeaders: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
      })
    }
    else
    {
      this.setState({
        nameHeaders: ['Su','Mo','Tu','We','Th','Fr','Sa']
      })
    }
  }

  updateCalendarHeader()
  {
    var day_names = this.state.nameHeaders
    const col_headers = []
    var day_name_count = 0;
    while (day_name_count < 7) {
        col_headers.push(
          <div key={day_names[day_name_count]} className={this.props.classes.calendar_header_names}>
            <Typography variant="body1" className={this.props.classes.typo_width}>
              {day_names[day_name_count]}
            </Typography>
          </div>
        );
      day_name_count++
    }
    return col_headers
  }

  render() {
    const col_headers = this.updateCalendarHeader()
    return(
      <div>
        <div className={this.props.classes.calendar_row_container}>{col_headers}</div>
      </div>
    );
  }
}

CalendarHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(CalendarHeader);
