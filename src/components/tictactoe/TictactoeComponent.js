import React from 'react';
import Player from './Player';
import { ENUMS } from './Constants';
import Board from './Board';
import TrainingButton from './TrainingButton';

const TictactoeComponent = () => {

  let p1 = new Player(ENUMS.X_VAL, false);
  let p2 = new Player(ENUMS.O_VAL, true);
  let board = new Board(p1, p2);

  let squares = board.renderSquares();

  function onTrainingClick() {
    board.trainComputer();
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
      <TrainingButton onTrainingClick={onTrainingClick} />
    </div>
  )
}

export default TictactoeComponent;
