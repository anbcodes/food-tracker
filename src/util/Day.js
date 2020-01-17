export default class Day {
  constructor(data) {
    this.date = data.date;
    this.items = data.items;
  }

  getItem(name, goals) {
    const item = this.items.filter(v => v.name === name)[0];
    if (item) {
      return item;
    }
    const newItem = { name: goals.name };
    this.items.push(newItem);
    return newItem;
  }

  toObject() {
    const obj = { date: this.date.firebaseTimestamp };
    obj.items = this.items;

    return obj;
  }

  static create(date) {
    return new Day({ date, items: [] });
  }
}
