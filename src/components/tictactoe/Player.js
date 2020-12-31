import Q from './Q';

class Player {
  constructor(value, isComputer) {
    this.value = value;
    this.q = new Q();
    this.wins = 0;
    this.isComputer = isComputer;
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

  move(actions, board) {
    return this.q.action(actions, board, this.value);
  }

  reward(points) {
    this.q.reward(points);
  }

  resetStatesHistory() {
    this.q.resetStatesHistory()
  }
}

export default Player;
