// Arrays are a special kind of Object in Javascript.

const arr = [1, 2, 3];
console.log(typeof(arr)); // 'object'

// Therefore they can have named properties assigned to them...

arr.namedProp = 'not enumerable'; 
console.log(arr); // '[ 1, 2, 3, namedProp: 'not enumerable' ]'

// However, since these properties are not numerically indexed...

console.log(arr[3]); // 'undefined'

// ...they are not enumerable with standard Array methods.

arr.forEach((enumerableEl) => {
    console.log(enumerableEl);
}); // 1\n 2\n 3

// The prototype of Array inherits from the prototype of Object:

console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype); // true
console.log(Object.prototype); // '[Object: null prototype] {}'

// If this doesn't make any sense yet, check out './inheritance.js'
