// The following are primitive, immutable data types in JavaScript:

Number;
Boolean;
String;
null;
undefined;
Symbol;
BigInt;

// We can use the typeof operator to check the type of an operand's value.

console.log(typeof 'My string'); // 'string'

// An anomaly to be aware of is that typeof(null) will return 'object'!

console.log(typeof null); // 'object'

/*
This is considered a bug, but it has remained in the language for compatibility reasons. NaN (Not-a-Number) is a
special value that is part of the Number type, and results from calculations involving invalid or undefined values.
*/

console.log(undefined * 100); // 'NaN'
console.log(typeof NaN); // 'number'

/*
Everything else in JavaScript is an object. Arrays are a special kind of object with index-based access and special
properties with regards to iteration. Crucially, functions are also objects, which can have properties and even
methods (like.call).
*/

const arr = [1, 2, 3];
console.log(typeof arr); // 'object'

// Arrays, being objects, can have named properties assigned to them...

arr.namedProp = 'not enumerable';
console.log(arr); // '[ 1, 2, 3, namedProp: 'not enumerable' ]'

// However, since these properties are not numerically indexed...

console.log(arr[3]); // 'undefined'

// ...they are not enumerable with standard Array methods.

arr.forEach((enumerableEl) => {
  console.log(enumerableEl);
}); // '1\n 2\n 3'

/*
When you try to access a method or property on a primitive value, JavaScript temporarily wraps it in a corresponding
object wrapper. Otherwise, these methods and properties could not exist, since only objects can have properties. The
process of wrapping a primitive value in a corresponding object is called 'boxing'.
*/

const songTitle = 'Come Together';
console.log(songTitle.toUpperCase()); // 'COME TOGETHER'
/*
The .toUpperCase function exists on the wrapper object.

Each primitive value has a corresponding constructor function:
*/
console.log(String); // '[Function: String]'

// When boxing a primitive value, the wrapper object inherits from the prototype of this constructor function:

console.log(String.prototype.toUpperCase); // '[Function: toUpperCase]'
console.log(songTitle.toUpperCase === String.prototype.toUpperCase); // true

// In other words, the wrapper object is created by calling `new String()`.
const boxedString = new String('Come Together');
console.log(typeof boxedString); // 'object'
console.log(boxedString); // '[String: 'Come Together']'
console.log(boxedString.toUpperCase); // '[Function: toUpperCase]'

// When two variables point to the same value of a primitive type, they will be referencing the same value in memory.

let greeting = 'Hello';
let reply = 'Hello';
console.log(greeting === reply ? 'Identical strings are deeply equal' : 'Nope.'); // 'Identical strings are deeply equal'

/*
Primitive values are generally stored on the stack. Their immutability and fixed size make them well-suited for stack
allocation given that the stack has a limited size. In contrast, objects are stored on the heap, a region of memory
used for dynamic allocation, since they can be of any size. Every object created has its own distinct location in heap
memory, and a reference to that location (much like a pointer in C) that is stored on the stack. Even if we add
identical properties to two objects, each of which point to the same primitive values, the objects themselves will have
unique addresses in memory and be distinct in the context of our program.
*/

greeting = { speech: 'Hello' };
reply = { speech: 'Hello' };
console.log(greeting === reply ? 'Objects with identical properties are deeply equal' : 'Nope.'); // 'Nope.'

/*
Knowing all this, let's examine whether JavaScript is a pass-by-value, or pass-by-reference language. We know that
primitive values are immutable, and when you pass a primitive value to a function, a copy of that value is made.
Changes to the parameter within the function do not affect the original value. This is pass-by-value.
*/

function modifyPrimitive(x) {
  x += 10; // This change is local to the function
}
let i = 5;
modifyPrimitive(i);
console.log(`i is ${i}`); // 'i is 5' - i is not modified by the function.

/*
For objects, JavaScript uses a strategy that is similar to pass-by-reference but is more accurately known as
"pass-by-value of the reference". When an object is passed to a function, the reference (address) to that object is
copied. Both the original and the copied reference point to the same object in memory. Changes made to the object's
properties within the function will affect the original object.
*/

function modifyObject(obj) {
  obj.name = 'Bob'; // This change affects the original object. The reference was copied to 'obj'.
}
let person = { name: 'Alice' };
modifyObject(person);
console.log(`person.name is ${person.name}`); // 'person.name is Bob'

/*
However, and perhaps surprisingly at first glance, if you reassign the object itself within the function, it does not
affect the original reference. This is because the parameter within the function now points to an entirely different
object in memory.
*/

function reassignObject(obj) {
  obj = { name: 'Grace' }; // This reassignment is local to the function.
}
let programmer = { name: 'Ada' };
reassignObject(programmer);
console.log(`programmer.name is ${programmer.name}`); // 'programmer.name is Ada'

/*
The reference to the location of the programmer object was copied to 'obj', but then 'obj' was reassigned within our
function, to hold a new reference to a new object.
*/
