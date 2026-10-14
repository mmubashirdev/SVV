let add = require("./math");

let a = 5;
let b = 10;
test(`Add number ${a} and ${b} = `,()=>{
  expect(add(a,b)).toBe(15);
})