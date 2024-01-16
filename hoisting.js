// The execution of Javascript code at run time happens in two primary stages
// First, the creation step looks at variable and function declarations, and creates a lexical scope for each.

// In the creation stage the engine is looking at the left hand side of a statement like this...

let declaration = 'assigned value';

// ...and creating a lexical scope for the variable 'declaration'.
// In this case the 'declaration' variable exists within the scope for the current node js module (the current file).

// The creation phase continues through the code top to bottom, scoping variables.
// It compiles the javasript to bytecode, an intermediary between JS and machine code.
// The execution phase then begins execution, starting back at the top of the file once more.

// Function declarations are scoped, including the function body, in the creation phase.
// Therefore, they executed before they are declared.

console.log(hoist()); // 'hoisted'

function hoist() {
  return 'hoisted';
}

// Function expressions, however, do not involve the hoisting of the function body.
// This is because during the creation phase, the right hand side (assignment) of variable declarations are ignored.

try {
  console.log(funcExpression()); 
} catch (e) {
  console.log(e.name); // 'TypeError'
}
  
var funcExpression = function () {
  return 'not hoisted';
}

// Prior to ES6 (2015), the var keyword was used to declare variables with function level scoping only.
// let and const were introduced with block scoping, a more robust and conventional approach.

// Variables declared with are hoisted, but since the creation phase ignores the right hand side of the declaration...
// Their value is undefined during the execution phase, before the JS engine has reached the line on which assignment occurs.

console.log(hoisty); // 'undefined'
var hoisty = 'old school';

// Hence why 'undefined' is printed to the terminal, as opposed to the runtime throwing a reference error.

// In contrast, when using let, or const, variables are still hoisted during the creation phase.
// However, they exist within a 'temporal deadzone' and therefore cannot be accessed before their assignment during execution.
// Doing so results in a reference error.

try {
  console.log(fnExpression()); 
} catch (e) {
  console.log(e.name); // 'ReferenceError'
}
  
const fnExpression = function () {
  return 'not hoisted';
}

// As a rule of thumb, use let and const for variable declarations. My use of var above has been for demonstration purposes only.

// Although based on constructor functions under the hood, class declarations behave like let or const in terms of hoisting.
// A class cannot be accessed before its declaration during the execution phase.

try {
  const tom = new Person (34);
} catch (e) {
  console.log(e.name); // 'ReferenceError'
}

class Person {
  constructor (age) {
    this.age = age;
  }
}
