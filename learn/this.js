const log = (msg) => process.stdout.write(`${msg} `);

function greet() {
  a = 77;
  console.log(this.a);
}

function greetNoA() {
  console.log(this.a);
}

const obj = {
  a: 10,
  greet: greet,
};

a = 12;

// logs global a = 12
console.log("original a in global context: ", a);

log("greetNoA");
greetNoA();

// in greet, modify global a = 77
log("greet");
greet();

// this is obj, so obj.a = 10
log("obj.greet");
obj.greet();

// a = 77 because greet() modified global from a=12 to a=77
log("a after modification in greet()");
console.log(a);

const foo = obj.greet;

// a in foo follows global context because foo is pointing to the function definition greet
// the fn definition is stored in heap, when assign foo, it is pointing to the fn definition
// and not the obj.greet.
foo();

// to explain futher
// greet2 defines a function with this.a
const obj2 = {
  a: 24,
  greet2: function () {
    console.log(this.a);
  },
};

obj2.greet2();
const foo2 = obj2.greet2;
// since foo2 is a property of the global context
// when call obj2.greet2, a is based on the global context property

// when call foo2, global context used, since foo2 is a property of global
foo2();
