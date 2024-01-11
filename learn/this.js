function greet() {
  var a = 9;
  console.log(this.a);
}

a = 12;
greet();
