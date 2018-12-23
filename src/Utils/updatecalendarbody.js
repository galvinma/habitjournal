import axios from 'axios';
import moment from 'moment'
import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

export function updateCalendarBody()
{
  var month = this.state.selectedMonth
  var daysInMonth = this.state.daysInMonth;
  var row_offset = moment(this.state.firstDayOfMonthDate).day();
  var offset_count = 1;
  var row = [];
  var count = 1;
  var daysInMonth = this.state.daysInMonth;
  while (offset_count <= row_offset) {
    row.push(
      <div key={String(offset_count)+String(month)+String(daysInMonth)} className={this.props.classes.typo_width}>
            <div className={this.props.classes.hidden}>{offset_count}</div>
            <div className={this.props.classes.calendar_list}></div>
      </div>
    );
    offset_count++
  }

  while (count <= daysInMonth) {
    var date = String(moment().date(count).format('D'));
    var date_to_compare = String(moment().month(this.state.selectedMonth).date(count).format(`dddd, MMMM Do, YYYY`));
    row.push(
        <div key={String(count)+String(date)+String(month)+String(daysInMonth)} className={this.props.classes.typo_width}>
              <div class="count_style">
                {count}
              </div>
              <div className={this.props.classes.calendar_list} id={date_to_compare}></div>
              <div class="list_footer_container" id={"footer"+date_to_compare} value={date_to_compare}>
              </div>
        </div>
    );
    count++
  }

  return row
}
