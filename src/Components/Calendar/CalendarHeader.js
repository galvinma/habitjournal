import React from 'react'
import moment from 'moment'

class CalendarHeader extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      getMonth: moment().format(),
    };
  }


  render() {
    return(
      <div>
        <p>Calendar Header</p>
      </div>
    );
  }
}


export default CalendarHeader;
