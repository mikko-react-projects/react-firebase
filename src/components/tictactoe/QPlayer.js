import { flatten } from 'lodash';
import { ENUMS } from './Constants';

class QPlayer {
  constructor(value, isComputer) {
    this.value = value;
    this.wins = 0;
    this.isComputer = isComputer;
    this.alpha = 0.2;
    this.decay = 0.8;
    this.expl_rate = 0.1;
    this.states = {};
    this.states_history = [];
  }

  move(actions, board) {
    let best = [];
    let prob = Math.random();
    if (prob < this.expl_rate) {
      best = actions[Math.floor(Math.random() * actions.length)];
    } else {
      let maxValue = -Infinity;
      best = actions[0];
      for (let i = 0; i < actions.length; i++) {
        let copy_1 = [...board];
        copy_1[actions[i][0]][actions[i][1]] = this.value;
        let value = this.states[this.hash(copy_1, this.value)] || 0;
        if (value > maxValue) {
          maxValue = value;
          best = actions[i];
        }
        copy_1[actions[i][0]][actions[i][1]] = 0;
      }
    }
    let copy_2 = [...board];
    copy_2[best[0]][best[1]] = this.value;
    this.states_history = [...this.states_history, this.hash(copy_2, this.value)]
    return best;
  }

  reward(points) {
    let rev = this.states_history.reverse();
    for (let i = 0; i < rev.length; i++) {
      if (!this.states[rev[i]]) {
        this.states[rev[i]] = 0;
      }
      this.states[rev[i]] += this.alpha * (this.decay * points - this.states[rev[i]]);
      points = this.states[rev[i]]
    }
  }

  resetStatesHistory() {
    this.states_history = []
  }

  hash(board, player) {
    return flatten(board).map((m) => {
      if (m === ENUMS.EMPTY_VAL) {
        return '-';
      }
      if (m === player) {
        return 'a';
      }
      return 'b';
    }).join('');
  }

  getValue() {
    return this.value;
  }

  getWins() {
    return this.wins;
  }

  addWin() {
    this.wins++;
  }

  getIsComputer() {
    return this.isComputer;
  }

  setIsComputer(val) {
    this.isComputer = val;
  }
}

export default QPlayer;
