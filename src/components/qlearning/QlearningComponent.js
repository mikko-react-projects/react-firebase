import React, { useState } from 'react';
import { Table, Grid, Button } from 'semantic-ui-react';
import '../../styles/matrix.css';

const QlearningComponent = () => {

  const [ traps, setTraps] = useState([])

  var trap_list = []

  if(localStorage.traps) {
    trap_list = JSON.parse(localStorage.getItem('traps'));
  }

  var q_matrix = [];

  for (let i = 0; i < 10; i++) {
    q_matrix[i] = [];
    for (let j = 0; j < 10; j++) {
      q_matrix[i][j] = [0, 0, 0, 0]
    }
  }

  function onTrapClick(row, col) {
    if (row > 0 && row < 9 && col > 0 && row < 9) {
      setTraps([
        ...traps,
        [row, col]
      ]);
      localStorage.setItem('traps', JSON.stringify([...trap_list, [row, col]]))
    }
  }

  function onResetClick() {
    setTraps([]);
    localStorage.removeItem('traps');
  }

  var env_matrix = [];

  for (let i = 0; i < 10; i++) {
    env_matrix[i] = [];
    for (let j = 0; j < 10; j++) {
      env_matrix[i][j] = [0, 0, 0, 0];
      if(i === 0) {
        env_matrix[i][j][1] = null
      }
      if(i === 9) {
        env_matrix[i][j][2] = null
      }
      if(j === 0) {
        env_matrix[i][j][0] = null
      }
      if(j === 9) {
        env_matrix[i][j][3] = null
      }
    }
  }

  // goal 2, 7
  env_matrix[2][8][0] = 100
  env_matrix[3][7][1] = 100
  env_matrix[1][7][2] = 100
  env_matrix[2][6][3] = 100

  for (let i = 0; i < traps.length; i++) {
    var t = traps[i];
    env_matrix[t[0]][t[1]+1][0] = -100;
    env_matrix[t[0]+1][t[1]][1] = -100;
    env_matrix[t[0]-1][t[1]][2] = -100;
    env_matrix[t[0]][t[1]-1][3] = -100;
  }

  function getAllPossibleNextAction(row, col) {
    var actions = [];
    for (var i = 0; i < env_matrix[row][col].length; i++) {
      if (env_matrix[row][col][i] !== null) {
        actions.push(i)
      }
    }
    return actions;
  }

  function getNextState(row, col, action) {
    var act = []
    switch(action) {
      case 0:
        act = [row, col-1]
        break;
      case 1:
        act = [row-1, col]
        break;
      case 2:
        act = [row+1, col]
        break;
      case 3:
        act = [row, col+1]
        break;
      default:
        break;
    }
    return act;
  }

  function isGameOver(row, col) {
    var rows = [];
    var cols = [];
    for (let i = 0; i < traps.length; i++) {
      rows.push(traps[i][0]);
      cols.push(traps[i][1]);
    }
    return (row === 2 && col === 7) || (rows.includes(row) && cols.includes(col))
  }

  const discount = 0.9;
  const learning_rate = 0.1;

  for (var episode = 0; episode < 1000; episode++) {

    var row = Math.floor(Math.random() * 10);
    var col = Math.floor(Math.random() * 10);

    while(!isGameOver(row, col)) {
      var p_a = getAllPossibleNextAction(row, col);
      var action = p_a[Math.floor(Math.random() * p_a.length)];
      var next_state = getNextState(row, col, action);
      var new_value = q_matrix[row][col][action]
        + learning_rate * (env_matrix[row][col][action]
        + discount * Math.max(...q_matrix[next_state[0]][next_state[1]])
        - q_matrix[row][col][action]);
      var copy = [...q_matrix];
      copy[row][col][action] = new_value;
      q_matrix = copy;
      row = next_state[0];
      col = next_state[1]
    }
  }

  return (
    <Table  celled>
      <Table.Body>
      {q_matrix.map((rows, i) =>
        <Table.Row key={i}>
        {rows.map((cells, j) =>
          <Table.Cell key={j} onClick={() => {onTrapClick(i, j)}}>
            <Grid columns={3}>
              <Grid.Row stretched className="matrix-row">
                <Grid.Column className="matrix-column">
                   <div className="matrix-cell-side">{Math.round(cells[0])}</div>
                </Grid.Column>
                <Grid.Column>
                  <div className="matrix-cell-center-top">{Math.round(cells[1])}</div>
                  <div className="matrix-cell-center-bottom">{Math.round(cells[2])}</div>
                </Grid.Column>
                  <Grid.Column>
                   <div className="matrix-cell-side">{Math.round(cells[3])}</div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Table.Cell>)}
        </Table.Row>)}
      </Table.Body>
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan='10'>
            <Button floated="right" onClick={() => {onResetClick()}}>Reset</Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
};

export default QlearningComponent;
