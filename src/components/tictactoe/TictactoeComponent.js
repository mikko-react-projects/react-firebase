import React from 'react';
import Player from './Player';
import { ENUMS } from './Constants';
import Board from './Board';

const TictactoeComponent = () => {
  
  let p1 = new Player(ENUMS.X_VAL, false);
  let p2 = new Player(ENUMS.O_VAL, true);
  let board = new Board(p1, p2);

  let squares = board.renderSquares();

  function onImproveClick() {
    board.improveComputer();
  }

  return (
    <div className="game">
      <div className="board">
        {squares}
      </div>
      <div className="scores">
        <h3>Tic-Tac-Toe</h3>
        <div className="total">AI experience: <span id="totalspan">0</span></div>
      </div>
      <div className="buttons" onClick={() => {onImproveClick()}}>
        <div className="toggle">Improve A.I.</div>
      </div>
    </div>
  )
}

export default TictactoeComponent;
