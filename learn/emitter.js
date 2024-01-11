function Emitter() {
  this.events = {};
}

Emitter.prototype.on = function (type, listener) {
  // if this.events[type] is undefined, set it to an empty array
  this.events[type] = this.events[type] || [];
  this.events[type].push(listener);
};

Emitter.prototype.emit = function (type) {
  if (this.events[type]) {
    this.events[type].forEach((listener) => {
      listener();
    });
  }
};

console.log();
