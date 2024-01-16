// When you try to access a method or property of a primitive value, JS wraps it in a corresponding object wrapper.
// Otherwise, these methods and properties would not exist on the primitive value, since only objects can have properties.
// The process of wrapping a primitive value in a corresponding object is called 'boxing'.

const songTitle = 'Come Together';
console.log(songTitle.toUpperCase()); // 'COME TOGETHER'
// The .toUpperCase function exists on the wrapper object.

// Each primitive value has a corresponding constructor function.

console.log(String) // '[Function: String]'

// When boxing a primive value, the wrapper object inherits from the prototype of this constructor function.

console.log(String.prototype.toUpperCase); // [Function: toUpperCase]
console.log(songTitle.toUpperCase === String.prototype.toUpperCase); // true

// In other words, the wrapper object is created by calling `new String()`.

console.log(typeof(new String())); // 'object'

// It is possible for the programmer to create objects from these constructor functions:

const booleanObject = new Boolean(true);
console.log(booleanObject); // '[Boolean: true]'
console.log(typeof(booleanObject)); // 'object'
