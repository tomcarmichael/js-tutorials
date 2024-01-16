// The following are primitive, immutable data types in Javasript:

Number
Boolean
String
null
undefined
Symbol
BigInt

// In contrast to Objects, two like values of one of these types reference the same value in memory.

let greeting = 'Hello';
let reply = 'Hello';

console.log(greeting === reply); // 'true'

greeting = { speech: 'Hello'};
reply = { speech: 'Hello'};

console.log(greeting === reply); // 'false'

// We can use the typeof operator to check the type of an operand's value.

console.log(typeof('My string')); // 'string'

// An anomaly to be aware of is that typeof(null) will return 'object'!

console.log(typeof(null)); // 'object'

// This is considered a bug, but it has remained in the language for compatibility reasons.

// NaN (Not-a-Number) is a special value that's part of the Number type, and results from calculations involving invalid or undefined values.

console.log(undefined * 100); // 'NaN'
console.log(typeof(NaN)); // 'number'

// Primitive values are stored on the stack and automatically destroyed when their containing function's execution context is popped off the stack.

// In contrast, objects are stored on the heap and accessed by reference...
// ...(the variable to which you assign them is stored on the stack with a pointer to the object's location within the heap)
