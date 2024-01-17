var input = 1;
function square() {
  let cbFn = function () {
    console.log(this.input * this.input);
  };
  setTimeout(cbFn, 1000);
}
var obj = {
  input: 3,
  square: square,
};
obj.square(); // 1
