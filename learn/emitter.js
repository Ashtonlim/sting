function Emitter() {
  this.events = {};
}

Emitter.prototype.on = function (type, listener) {
  // if this.events[type] is undefined, set it to an empty array
  this.events[type] = this.events[type] || [];
};
console.log();
