// 'this' is a keyword, not a variable. It cannot be reassigned, if you try to you will get a syntax error.

// Objects don't create a binding to the 'this' keyword, functions do.

outerThis = this;

const myObj = {
  myCoolProperty: 'Some value',
  showThis: this,
}

console.log(myObj.showThis); // '{}'
console.log(myObj.showThis === outerThis); // 'true'

function myFunc () {
  console.log(this === outerThis); // 'false'
}
myFunc();

// An important exception is arrow functions, which do not create their own exceution context, with a binding to 'this'
// CHECK if correct and add example
