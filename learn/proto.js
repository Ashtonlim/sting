const { log } = require("./shortcuts.js"); // shortcut

function Person(firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
}

Person.prototype.greet = function () {
  console.log(`Hello ${this.firstname} ${this.lastname}.`);
};

const john = new Person("John", "Doe");
log(john.firstname);
john.greet();

const jane = new Person("Jane", "Doe");
log(jane.firstname);
jane.greet();

const obj = {};

// log(obj !== {}) // always true because does not compare values, but references

log(Object.prototype === {}.prototype);

// Object is a function, when called, returns {}
log({}, Object(), new Object());

// Using Object(2) is not useful because Object() is never used to instatiate non-primitives
// Instantiating objects, i.e. Object({key: 'val'}) are USEFUL and typical
log(Object(2));

// both [] and null are objects
log(typeof [] === typeof null);
