import React, { useState } from 'react';
import { Table } from 'semantic-ui-react';
import '../../styles/calendar.css';

const CalendarTable = () => {

  const [ month, setMonth ] = useState(new Date().getMonth());
  const [ year, setYear ] = useState(new Date().getFullYear());

  function createCalendar() {

    const start = new Date(year, month).getDay();
    const total = 32 - new Date(year, month, 32).getDate();
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    var renderNum = 1;

    var tbl = document.createElement("table");
    tbl.setAttribute("class","calendar-table");

    var header = document.createElement('thead');
    header.setAttribute("class","calendar-header");

    var headerRow = document.createElement('tr');
    headerRow.setAttribute("class","calendar-header-row");

    for (var i = 0; i < weekDays.length; i++) {
      var hc = document.createElement('td');
      hc.setAttribute("class","calendar-header-cell");

      var ht = document.createTextNode(weekDays[i]);

      hc.appendChild(ht);
      headerRow.appendChild(hc)
    }

    var tbody = document.createElement("tbody");
    tbody.setAttribute("class","calendar-tablebody");

    for (var j = 0; j < 6; j++)  {
      var row = document.createElement('tr');
      for (var k = 0; k < 7; k++) {
        if (j === 0 && k < start) {
          var tde = document.createElement('td');
          tde.setAttribute("class","calendar-body-cell-empty");
          tde.classList.add('empty');
          row.append(tde);
        } else if (renderNum > total) {
          break
        } else {
          var tdd = document.createElement('td');
          tdd.setAttribute("class","calendar-body-cell-date");
          tdd.textContent = renderNum;
          row.append(tdd);
          renderNum++;
        }
      }
      tbody.append(row)
    }

    header.appendChild(headerRow);
    tbl.appendChild(header);
    tbl.appendChild(tbody);

    return tbl;

  }

  return (
    <div ref={(nodeElement) => {nodeElement && nodeElement.appendChild(createCalendar())}} />
  )
};

export default CalendarTable;
