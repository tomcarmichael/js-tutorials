// In JavaScript, an object is a collection of properties, where each property is a key-value pair.
// Unlike traditional object oriented languages like C++, objects need not be created from a class.

// This is because Javascript uses protoypal inheritance for objects.

// If we create a new object using object literal syntax...

const obj = {};

// This is in fact equivalent to calling the constructor function named Object, which is avaialable in global scope.

const constructed = new Object();

// Both objects have a property '.__proto__' (pronounced 'dunder proto'). These properties reference the same object.

console.log(obj.__proto__ === constructed.__proto__); // 'true'

// And the prototype itself contains a reference back to the corresponding function - the '.constructor' property.

console.log(constructed.__proto__.constructor); // '[Function: Object]'
console.log(constructed.__proto__.constructor === Object); // 'true'

// The use of .__proto__ is deprecated however, and we should use Object.getPrototypeOf() instead...

console.log(obj.__proto__ === Object.getPrototypeOf(obj)); // 'true'
console.log(Object.getPrototypeOf(obj)); // '[Object: null prototype] {}'

// This prototype object defines the properties that all objects created by the Object() function will inherit.
// The reason we see 'null prototype' logged here is that the Object constructor has no parent object it inherits from.
// What we just logged is the root prototype of all objects in Javascript.

// Functions in JS are objects, and perhaps surprisingly, can have properties (which can themselves be functions).
// Hence our call to Object.getPrototypeOf(obj) above.
// Every constructor function has a reference to its corresponding prototype object via the property '.prototype'

console.log(obj.__proto__ === Object.prototype); // 'true'

// The 'class' keyword introduced in ES6 (2015) provides syntactic sugar for constructor functions and their prototype objects.
class Human {
  constructor(age) {
    this.age = age;
  }
}

// Is equivalent to...
function Dog(age) {
  this.age = age;
}

const bob = new Human(62);
const dave = new Dog(9);

console.log(bob); // 'Human { age: 62 }'
console.log(dave); // 'Dog { age: 9 }'

// This is what defines a constructor function - it is intended to be called with the 'new' keyword.
// The 'new' keyword automatically initialises an empty object at the start of the funtion invocation, binding the 'this' keyword to that object.
// It then returns that object at the end of the function invocation.

// If we wanted to give the objects created by our constructor function methods, assigning these within the constructor like this...

function Cat(age) {
  this.age = age;
  this.talk = function() { return 'meow' };
}

// Would result in a unique copy of the talk function being created for each new object created.

const daisy = new Cat(3);
const phil = new Cat(1);

console.log(daisy.talk === phil.talk); // 'false'

// To avoid this redundancy, we can create a single function on the constructor's prototype, which all child objects will reference.

Cat.prototype.sleep = function() { return 'zzz' };

console.log(daisy.sleep()) // 'zzz'
console.log(phil.sleep()) // 'zzz'
console.log(daisy.sleep === phil.sleep); // 'true'

// We would equivalentally define the 'sleep' method using the following 'class' syntax...

class Panda {
  constructor(age) {
    this.age = age;
  }
  sleep() { // Assigned to a property on the constructor's prototype!
    return 'snorrrre';
  }
}

const billy = new Panda(18);
console.log(billy.sleep()); // 'snorrrre'

// But, jumping back to our constructor/prototype implementation for daisy and phil...
// ...how is it that the JS engine was able to find a '.sleep' property for these objects?

console.log(phil); // 'Cat { age: 1, talk: [Function (anonymous)] }'

// Notice, there is no sleep property on Phil, because we assigned it on the Cat.prototype object.
// The reason this works is that the JS engine looks up the prototype chain in order to search for a given property of an object.
// First, it checks phil to see if phil has a .sleep property.
// If it doesn't find it, it looks at phil's .__proto__ (Cat) protoype object, and checks there for it.
// If it hadn't found it there, it would have moved once more up the chain, to the root Object prototype we saw earlier.
// Since the Object prototype has a .prototype value of null, the prototype chain ends here.

const rootObjPrototype = Object.getPrototypeOf({});
console.log(Object.getPrototypeOf(rootObjPrototype)); // null

// Ok, so how do we create multi-level inheritance that leverages this protoype chain under the hood?
// Well, using constructor functions, we can re-assign their prototype property to a parent prototype object.

function Kitten(age) {
  Cat.call(this, age); // Equivalent to super(age) using the class syntax
}

const mcTat = new Kitten(3);
console.log(mcTat); // 'Kitten { age: 3, talk: [Function (anonymous)] }'
// Calling the Cat constructor within our Kitten function allowed us to execute the assignments within it, but since we passed 'this' from the Kitten function...
// The object created and returned is a Kitten, and maintains no reference to the prototype of Cat.

// What is the 'parent' prototype of our Kitten function's prototype currently?
console.log(Object.getPrototypeOf(Kitten.prototype)); // 'Object: null prototype] {}' (The root Object prototype).

// We want to set re-assign this to reference the Cat prototype...
Kitten.prototype.__proto__ = Cat.prototype

// However, the preferred way to do this is using this syntax:
Kitten.prototype = Object.create(Cat.prototype); // TODO check and explain this better

const felix = new Kitten(2);
console.log(felix.sleep()); // 'zzz'

// A bite mor about the .call function we used on line 115...
// Since functions are objects in JS, they can themselves have properties.
// .call a function itself, and it provides a way to call the function that it is a property of...
// ...passing the current binding to the 'this' keyword as its first argument.
// The following parameters of .call() are the remaining arguments of the function it exists on.

// Next - go to './classes.js'
