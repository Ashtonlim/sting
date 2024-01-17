let fs = require("fs");

let data = fs.readFileSync("demo.txt", "utf8");
console.log(data.toString());
