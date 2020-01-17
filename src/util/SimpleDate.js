import * as firebase from 'firebase/app';
import 'firebase/firestore';


export default class SimpleDate {
  constructor(dateOrString = new Date()) {
    if (dateOrString instanceof SimpleDate) {
      dateOrString = dateOrString.date;
    }
    this.date = SimpleDate.parseDate(dateOrString);
    this.string = SimpleDate.parseString(dateOrString);
    this.firebaseTimestamp = SimpleDate.parseFire(dateOrString);
    this.dateOrString = dateOrString;
  }

  static parseDate(date) {
    if (date instanceof Date) {
      return date;
    }
    if (date instanceof firebase.firestore.Timestamp) {
      return firebase.firestore.Timestamp.toDate();
    }
    if (typeof date === 'string') {
      return new Date(date);
    }

    return null;
  }

  static parseString(obj) {
    if (obj instanceof Date) {
      return new Date(obj).toISOString().slice(0, 10);
    }
    if (obj instanceof firebase.firestore.Timestamp) {
      return firebase.firestore.Timestamp.toDate().toISOString().slice(0, 8);
    }
    if (typeof obj === 'string') {
      return obj;
    }

    return null;
  }

  static parseFire(obj) {
    if (obj instanceof Date) {
      return firebase.firestore.Timestamp.fromDate(obj);
    }
    if (obj instanceof firebase.firestore.Timestamp) {
      return obj;
    }
    if (typeof obj === 'string') {
      return firebase.firestore.Timestamp.fromDate(new Date(obj));
    }

    return null;
  }

  add(num) {
    const date = new Date(this.date);
    date.setDate(date.getDate() + num);
    return new SimpleDate(date);
  }

  remove(num) {
    const date = new Date(this.date);
    date.setDate(date.getDate() - num);
    return new SimpleDate(date);
  }

  toString() {
    return this.string;
  }

  toValue() {
    return +this.date;
  }
}
