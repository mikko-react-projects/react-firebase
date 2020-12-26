import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTasks } from '../../actions/tasks';
import DateItemSemantic from './DateItemSemantic';
import { Table, Icon, Grid } from 'semantic-ui-react';

const CalendarComponentSemantic = ({ fetchData, tasks }) => {

  const [ month, setMonth ] = useState(new Date().getMonth());
  const [ year, setYear ] = useState(new Date().getFullYear());
  // eslint-disable-next-line
  useEffect(fetchData, []);

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  function onPrev() {
    if (month > 0) {
      setMonth(month - 1);
    } else {
      setMonth(11);
      setYear(year - 1);
    }
  }

  function onNext() {
    if (month < 11) {
      setMonth(month + 1);
    } else {
      setMonth(0);
      setYear(year + 1);
    }
  }

  //add weekdays to table header
  const weekdaysShort = weekdays.map(day => {
    return (<Table.HeaderCell key={day} className="week-day">{day}</Table.HeaderCell>)
  });

  var keyNumber = 0;

  //add pre empty days to array
  var firstWeekday = new Date(year, month).getDay() - 1;
  if(firstWeekday === -1) {
    firstWeekday = 6
  }
  var preblanks = [];
  for (var i = 0; i < firstWeekday; i++) {
    preblanks.push(
      <Table.Cell key={keyNumber}></Table.Cell>
    );
    keyNumber++;
  }

  //returns task data if task exists for current day, otherwise its empty array
  function taskExists(day) {
    var tasksInMonth = tasks.find(task => {
      return task.year === year && task.month === month && task.day === day
    })
    return tasksInMonth ? tasksInMonth : []
  }

  //add days with tasks to calendar
  const totalDays = 32 - new Date(year, month, 32).getDate();
  var daysInMonth = [];
  for (var d = 1; d <= totalDays; d++) {
    daysInMonth.push(
      <DateItemSemantic
        key={keyNumber}
        day={d}
        month={month}
        year={year}
        tasks={taskExists(d)}
      />
    );
    keyNumber++;
  }

  //add late empty days to array
  var lateEmpties = preblanks.length + daysInMonth.length
  var lateblanks = [];
  while (lateEmpties % 7 !== 0) {
    lateblanks.push(
      <Table.Cell key={keyNumber} className="calendar-day empty">{""}</Table.Cell>
    );
    lateEmpties++;
    keyNumber++;
  }

  //combine empty-slots and day-slots to one array
  var totalSlots = [...preblanks, ...daysInMonth, ...lateblanks];

  var rows = [];
  var cells = [];

  totalSlots.forEach((day, i) => {
    if (i % 7 !== 0) {
      cells.push(day);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(day);
    }
    if (i === totalSlots.length - 1) {
      rows.push(cells);
    }
  });

  var daysinmonth = rows.map((d, i) => {
    return <Table.Row key={i}>{d}</Table.Row>;
  });

  return (
    <div className="tail-datetime-calendar">
      <div className="calendar-navi">
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}>
              <Icon name="caret left" size="large" onClick={() => {onPrev()}}/>
            </Grid.Column>
            <Grid.Column width={14}>
              {monthNames[month]}
            </Grid.Column>
            <Grid.Column width={1} floated="right">
              <Icon name="caret right" size="large" onClick={() => {onNext()}}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <div className="calendar-date">
        <Table className="calendar-table">
          <Table.Header>
            <Table.Row>
              {weekdaysShort}
            </Table.Row>
          </Table.Header>
          <Table.Body className="calendar-tbody">
            {daysinmonth}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
};

const mapStateToProps = (state) => {
  return{
    tasks: state.tasks.tasks
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => {
    dispatch(fetchTasks())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarComponentSemantic);
