import SimpleDate from './SimpleDate';

export default class Goal {
  constructor({
    name, amount, icon, color, id, days, unit,
  }, day) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.icon = icon;
    this.color = color;
    this.currentDay = new SimpleDate(day || new SimpleDate());
    this.days = days;
    this.unit = unit;
  }

  addAmountToDay(day, amount) {
    this.getDay(day);
    const simpleDate = new SimpleDate(day);
    this.days[simpleDate.string] += +amount;
  }

  update({
    name, amount, icon, color,
  }) {
    this.name = name;
    this.amount = amount;
    this.icon = icon;
    this.color = color;
  }

  getDay(day = this.currentDay) {
    day = new SimpleDate(day);
    if (this.days[day.string]) return this.days[day.string];

    const newDay = 0;
    this.days[day.string] = newDay;
    return this.days[day.string];
  }

  toObject() {
    return {
      name: this.name,
      amount: this.amount,
      icon: this.icon,
      color: this.color,
      days: this.days,
      id: this.id,
      unit: this.unit,
    };
  }

  static create({
    name, amount, icon, color, unit, days = {},
  }) {
    const id = +(new Date());
    return new Goal({
      name,
      amount,
      icon,
      color,
      days,
      id,
      unit,
    });
  }
}
