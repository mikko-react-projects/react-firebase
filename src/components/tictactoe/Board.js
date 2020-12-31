import React from 'react';
import { ENUMS } from './Constants';
import '../../styles/tictactoe.css';

class Board {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.totalGames = 0;
    this.current = this.p1;
    this.resetBoard();
    this.renderSquares();
  }

  resetBoard() {
    this.board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
  }

  getGameResult() {
    let size = this.board.length;
    let streak = 3;

    // check if we have a winner
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let result = _checkForWin(this.board, streak, i, j);
        if (result) {
          return result;
        }
      }
    }
    // check if the board is not full
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if(this.board[i][j] === 0) {
          return ENUMS.NOT_ENDED
        }
      }
    }
    return ENUMS.DRAW
  }

  getActions() {
    let actions = []
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === ENUMS.EMPTY_VAL) {
          actions = [...actions, [i, j]]
        }
      }
    }
    return actions;
  }

  move(pos, player) {
    let actions = this.getActions();
    for (let i = 0; i < actions.length; i++) {
      if (pos[0] === actions[i][0] && pos[1] === actions[i][1]) {
        this.board[pos[0]][pos[1]] = player;
      }
    }
  }

  sleep() {
    return new Promise(resolve => setTimeout(resolve, 5));
  }

  async delayedComputerTurn() {
    await this.sleep();
    this.ComputerTurn();
  }

  reset(result) {
    this.resetBoard();
    if (result === this.p1.getValue()) {
      this.p1.reward(1);
      this.p2.reward(-1);
      this.p1.addWin()
    } else if (result === this.p2.getValue()) {
      this.p1.reward(-1);
      this.p2.reward(1);
      this.p2.addWin();
    } else {
      this.p1.reward(0.1);
      this.p2.reward(0.1);
    }
    this.totalGames++;
    this.p1.resetStatesHistory();
    this.p2.resetStatesHistory();
    let total = document.getElementById("totalspan");
    total.innerHTML = '';
    let t = document.createTextNode(this.totalGames);
    total.appendChild(t);
    this.updateBoard();
    if (this.totalGames % 2 === 0) {
      this.current = this.p2;
    } else {
      this.current = this.p1;
    }
    if (this.current.getIsComputer()) {
      this.delayedComputerTurn();
    }
  }

  ComputerTurn() {
    let actions = this.getActions();
    let action = this.current.move(actions, this.getBoardCopy());
    this.move(action, this.current.getValue());
    this.updateBoard();
    this.nextPlayer();
  }

  onClickSquare(uid) {
    let sqr = document.getElementById(uid);
    if (sqr.textContent) {
      return;
    };
    let coords = uid.split('');
    this.board[coords[0]][coords[2]] = this.current.getValue();
    this.updateBoard();
    this.nextPlayer();
  }

  nextPlayer() {
    let result = this.getGameResult();
    if (result === ENUMS.NOT_ENDED) {
      if (this.current === this.p1) {
        this.current = this.p2;
      } else {
        this.current = this.p1;
      }
      if (this.current.getIsComputer()) {
        this.ComputerTurn();
      }
    } else {
      this.reset(result);
    }
  }

  trainComputer() {
    if (!this.p1.getIsComputer()) {
      this.p1.setIsComputer(true);
    } else {
      this.p1.setIsComputer(false);
    }
    this.resetBoard();
    this.updateBoard();
    this.nextPlayer();
  }

  updateBoard() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        let val = this.board[i][j];
        let uid = i + "|" + j
        if (val === ENUMS.X_VAL) {val = "X"}
        if (val === ENUMS.O_VAL) {val = "O"}
        if (val === ENUMS.EMPTY_VAL) {val = ''}
        let sqr = document.getElementById(uid);
        sqr.innerHTML = '';
        let v = document.createTextNode(val);
        sqr.appendChild(v);
      }
    }
  }

  getBoardCopy() {
    return [...this.board];
  }

  getTraining() {
    return this.training;
  }

  renderSquares() {
    let squares = [];
    let index = 0;
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        let val = this.board[i][j];
        let uid = i + "|" + j;
        if (val === ENUMS.X_VAL) {val = "X"}
        if (val === ENUMS.O_VAL) {val = "O"}
        if (val === ENUMS.EMPTY_VAL) {val = ''}
        let div =
          <div
            key={uid}
            className="square"
            id={uid}
            onClick={() => {this.onClickSquare(uid)}}
          >
            {val}
          </div>;
        squares[index] = div;
        index++;
      }
    }
    return squares;
  }
}

//////////////////////////////////////////////////////////////////////

function _checkForWin(board, streak, x, y) {
  let symbol = board[y][x];
  if (symbol === 0) {
    return false;
  }
  let horizontalWin = _horizWin(board, streak, x, y);
  let verticalWin = _vertWin(board, streak, x, y);
  let diagonal1Win = _diag1Win(board, streak, x, y);
  let diagonal2Win = _diag2Win(board, streak, x, y);

  if (horizontalWin || verticalWin || diagonal1Win || diagonal2Win) {
    return symbol;
  }
  return false;
}

function _horizWin(board, streak, x, y) {
  while (streak--) {
    if (board[y][x] !== board[y][x + streak]) {
      return false;
    }
  }
  return true;
}

function _vertWin(board, streak, x, y) {
  while (streak--) {
    if (!board[y + streak]) {
      return false;
    }
    if (board[y][x] !== board[y + streak][x]) {
      return false;
    }
  }
  return true;
}

function _diag1Win(board, streak, x, y) {
  while (streak--) {
    if (!board[y + streak]) {
      return false;
    }
    if (board[y][x] !== board[y + streak][x + streak]) {
      return false;
    }
  }
  return true;
}

function _diag2Win(board, streak, x, y) {
  while (streak--) {
    if (x - streak < 0) {
      return false;
    }
    if (!board[y + streak]) {
      return false;
    }
    if (board[y][x] !== board[y + streak][x - streak]) {
      return false;
    }
  }
  return true;
}

export default Board;
