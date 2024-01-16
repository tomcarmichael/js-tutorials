/*
'this' is a keyword, not a variable. It cannot be reassigned - if you try to, you will get a syntax error. The value of
'this' is established with each new function execution context. At the start of a function execution, a local variable
environment is created which includes a binding of the 'this' keyword. In other words, the value of 'this' is determined
by how a function is called, not where it is defined. 'this' dynamically binds to the context in which a function is
executed.

There are several scenarios that lead to different values for 'this':

1. Global Context (Default Binding):
-----------------------------------

When 'this' is used outside of any function, it refers to the global object. In browsers, this is the window object.
In a modern ES6 module (using the'import' and 'export' syntax), the value of 'this' at the top level is undefined. 
In a Node.js CommonJS module (as is the case in this file) 'this' at the top level refers to the module.exports object:
*/

console.log(this); // '{}' - an empty object, since we have not yet exported anything.
module.exports.myExport = `I'm bound to 'this'`;
console.log(this); // '{ myExport:"I'm bound to 'this'" }'

/*
This is because the top-level code in a CommonJS module is wrapped in a function by the module system. The wrapper
function is called using its .call method, with 'this' set to the exports object. More on .call later...

2. Function 'this' (no Strict Mode):
-----------------------------------

When you define and call a function in non-strict mode, 'this' inside the function defaults to the global object.
As mentioned, for browsers this is window. For ES6 modules this is undefined. For CommonJS modules though, it differs
from what we saw above, and is indeed the global object, since the binding to module.exports only applies at the top
level. This global object has a bunch of properties on it including built-in functions like setTimeout.
*/

function laxFunction() {
  console.log(this);
}
laxFunction(); // logs the global object

/*
3. Function 'this' (Strict Mode):
--------------------------------
In strict mode, 'this' is undefined in functions that are not called as methods on any object, in the browser and in
CommonJS Node modules. This behaviour was introduced to JavaScript to eliminate a class of bugs arising from 'this'
being bound to the global object within functions, something that is easily overlooked by developers and can lead to
unintended mutation of global. Strict Mode should generally be used as a best practice default.
*/

function strictFunction() {
  'use strict';
  console.log(this); // Strict mode prevents 'this' being assigned to the global scope/object
}
strictFunction(); // 'undefined'

/*
4. Object Method Binding:
------------------------

When a function is called as a method of an object, 'this' is bound to the object the method is called on. We can think
of this as subject upon which the function is called, or the the caller of the method. 'this' is bound to the object on
the left hand side of the dot notation that precedes the function invocation.
*/

const obj = {
  name: 'Alice',
  greet: function () {
    console.log(this.name);
  },
};
obj.greet(); // "Alice" - 'this' is bound to 'obj'.

/*
5. Constructor Function Binding (new Binding):
--------------------------------------------

As explained in the accompanying article on prototypal inheritance and OOP in JavaScript, when a function is used as a
constructor (when it is called with the 'new' keyword), 'this' is bound to the object created within, and eventually
returned from, the function.
*/

function Person(name) {
  // An object is automatically created here with a binding to 'this'.
  this.name = name;
  // That same object is automatically returned when the function has completed execution.
}
const bob = new Person('Bob');
console.log(bob.name); // 'Bob' - the name property was assigned using the 'this' keyword.

/*
6. Explicit Binding (call, apply, and bind):
-------------------------------------------

JavaScript allows the binding of 'this' to be explicitly defined using the call, apply, or bind methods which exist on
all functions. Let's take a look at each of these...

.call
-----
Calls the function with a given 'this' value, and the arguments to the function provided individually:
*/

function greet(profession) {
  console.log(`${this.name} is a ${profession}`);
}
greet.call(bob, 'programmer'); // 'Bob is a programmer'
// We passed the bob object we created above as the first arg in order to bind it to 'this'.

/*
.apply
------
Similar to .call, but with arguments passed as a single array:
*/

function greet2(profession, language) {
  console.log(`${this.name} is a ${language} ${profession}`);
}
greet2.apply(bob, ['programmer', 'JavaScript']); // 'Bob is a JavaScript programmer'

/*
.bind
-----
Returns a new function with a specific 'this' value, but does not invoke it immediately:
*/

const alice = { name: 'Alice' };
const greetAlice = greet2.bind(alice); // 'this' is bound to the alice object within the greetAlice function.
greetAlice('developer', 'JS'); // "Alice is a JS developer"

/*
7. Arrow Functions:
-------------------

Arrow functions differ from regular functions in that they do not have their own 'this' context. Instead, 'this' is
lexically inherited from the enclosing scope at the place where the arrow function is defined, not when it is executed.
*/

const myObj = {
  value: 42,
  regularFunction: function () {
    console.log(this.value); // 'this' will be bound to the subject 'myObj' when calling `myObj.regularFunction()`
  },
  arrowFunction: () => {
    console.log(this.value); // 'this' maintains its value in the current execution context (the global scope/object).
  },
};

myObj.regularFunction(); // '42'
myObj.arrowFunction(); // 'undefined' (throws an error in strict mode) - global has no .value property.

/*
8. Class Methods:
----------------
In class constructors and methods, 'this' refers to the instance of the class. Simples.
*/

class Programmer {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(this.name);
  }
}

const brendan = new Programmer('Brendan');
brendan.greet(); // 'Brendan'

/*
9. Event Handler Binding:
------------------------

In event handlers methods of the document object in the browser, 'this' typically refers to the element that received
the event. In React class-based components, this can cause problems if you attempt to assign a class method as a
callback to an HTML event attribute like 'onClick'. To resolve this, you must ensure that you bind the value of 'this'
within the callback function to the enclosing class instance explicitly.
*/
