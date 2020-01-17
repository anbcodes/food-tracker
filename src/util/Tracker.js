import SimpleDate from './SimpleDate';

export default class Tracker {
  constructor(id) {
    this.id = id;
    this.day = new SimpleDate();
    this.goals = [];
  }

  pullFromServer() {
    const data = JSON.parse(localStorage.getItem('sampleData'));
    Object.apply(this, data);
  }

  pushToServer() {
    const data = this.propertiesToSave();
    localStorage.setItem('sampleData', JSON.stringify(data));
  }

  propertiesToSave() {
    const properties = {};
    properties.goals = this.goals.map(goal => goal.toObject());
  }

  getDay(date) {
    return this.goals.map(goal => goal.getDay(date));
  }

  addGoal(goal) {
    this.goals.push(goal);
  }

  removeGoal(id) {
    this.goals = this.goals.filter(goal => goal.id !== id);
  }
}
