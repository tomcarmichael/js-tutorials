/*
Closures are closely linked with scope, so let's start with reviewing scope in JavaScript. Functions have access to
the variables defined outside of them. We can use an Immediately Invoked Function Expression, or IIFE ('iffy') to
demonstrate this:
*/

let globalCounter = 0;

(function () {
  globalCounter += 1;
  console.log(`globalCounter is ${globalCounter}`); // 'globalCounter is 1'
})(); // '1'

/*
We might assume that this is possible because globalCounter was in scope within the function from which it was called,
or in other words, it is where you call your function that will determine the variables it has access to within its
own execution context. But in fact, it is because JavaScript uses lexical scoping. Functions have access to variables
that are in scope at the point of the code where they are defined not where they are invoked. 

The dictionary definition of 'lexical' is 'relating to the words or vocabulary of a language'. In the context of
programming languages, it refers to the fact that the scope of a variable is defined by its textual position in the
source code.

We can prove this by calling a function from outside of the function where in which it was defined. To do this we need
to leverage JavaScript's ability to treat function as first class citizens, which can be returned from enclosing
functions:
*/

function memento() {
  let counter = 0;

  function increment() {
    counter += 1;
    return counter;
  }
  return increment;
}

const incrementor = memento(); // the function definition formerly known as increment is assigned to incrementor

console.log(incrementor()); // '1'
console.log(incrementor()); // '2' incrementor has access to the value of counter

const incrementor2 = memento(); // the function definition formerly known as increment is assigned to incrementor2

console.log(incrementor2()); // '1'
console.log(incrementor2()); // '2' incrementor2 has access to its own unique counter

/*
As soon as memento had returned, it was popped off the call stack, and its local execution context including its local
memory (AKA local variable environment) was made eligible for garbage collection. Soon after it would have been deleted.
This is what happens after any function returns.

So how was incrementor2 able to find the value of counter?

The answer is that when the function increment was defined within memento, it was assigned a special hidden property
named [[scope]], which represents the 'closed over variable environment'. It contains references to all of the variables
that were in scope at the point of our code where increment was defined.

Note that these references are effectively pointers to the original values, not copies. This is how the values, such as
our counter in the example above, can be modified across different execution contexts.

When the JavaScript engine is unable to find a variable within the current execution context's local memory, it does not
first look down the call stack at the calling function's local memory. It looks in the [[scope]] property. Since this
contains all of the variables in scope at the point where the function was defined, as well as references to its outer
(parent) scopes, it forms a 'scope chain' that extends all the way up to the global scope.

We can demonstrate this with deeper nesting of functions:
*/

const globalValue = 'Hello from the global scope';

function outerFunc() {
  const outerVar = 'Hello from the outerFunc scope.';
  function innerFunc() {
    const innerVar = 'Hello from the innerFunc scope.';
    console.log(innerVar); // 'Hello from the innerFunc scope.'
    console.log(outerVar); // 'Hello from the outerFunc scope.'
    console.log(globalValue); // 'Hello from the global scope'
  }
  innerFunc();
}
outerFunc();

/*
So what benefits do closures provide us with? In our memento function above, we saw that our functions gained a kind of
memory of their own, with access to their own encapsulated, persistent state. We can also leverage closures to, amongst
other useful things, create memoized versions of functions. Memoization can improve the performance of our functions by
caching the results of expensive function calls and returning the cached result when the same arguments are provided
with subsequent calls.

Let's utilise closure to create a memoizer function, and then memoize a function that calculates the nth number in the
Fibonacci sequence:
*/

function memoizer(fn) {
  const cache = {};

  return function memoized(...args) {
    // Rest parameter allows memoization of functions with multiple params
    const key = JSON.stringify(args); // Convert the array of args into a string that can be used as a key
    if (key in cache) return cache[key]; // check for a cache hit
    // Else, we have not returned, so we have a cache miss, and we perform our calculation:
    const result = fn(...args);
    cache[key] = result; // Store the result in the cache for future function calls to leverage
    return result;
  };
}

const memoizedFib = memoizer(function (n) {
  // we provide an anonymous function declaration to the memoizer
  console.log(`invoked memoizedFib(${n})`);
  /* We define our base case for the recursion - if we have hit the first or second numbers in the sequence,
  simply return those values: */
  if (n <= 1) return n;
  // Else, the nth fibonacci number is equivalent to the sum of the previous two numbers in the sequence:
  return memoizedFib(n - 1) + memoizedFib(n - 2);
});
console.log(memoizedFib(6));

/*
If we compare this to a version of our Fibonacci function that does not use memoization, we are going to see in our
console logs that the memoized version allowed us to avoid a lot of extra calls and computation. This is particularly
evident in our example since we're using recursion in a way that results in a tree-like exponential number of function
calls - each invocation of our Fibonacci function itself results in two more invocations of the same function. You can
picture these function calls branching off of each other in twos to get a sense of how the call graph resembles a
tree-like structure and quickly becomes inefficient for larger values of n.
*/

const slowFib = function (n) {
  console.log(`invoked slowFib(${n})`);
  if (n <= 1) return n;
  return slowFib(n - 1) + slowFib(n - 2);
};
console.log(slowFib(6));

/*
memoizedFib was invoked 7 times, as evidenced in our console logs, while slowFib was invoked 24 times. memoizedFib will
always be invoked n-1 times, whilst slowFib will be invoked a number of times that is related to the nth number in the
Fibonacci sequence, and so grows much more quickly. 

Here's a visualisation of the call graph for slowFib(6) to help you visualise the inefficiency:

slowFib(6)
├── slowFib(5)
│   ├── slowFib(4)
│   │   ├── slowFib(3)
│   │   │   ├── slowFib(2)
│   │   │   │   ├── slowFib(1)
│   │   │   │   └── slowFib(0)
│   │   │   └── slowFib(1)
│   │   └── slowFib(2)
│   │       ├── slowFib(1)
│   │       └── slowFib(0)
│   └── slowFib(3)
│       ├── slowFib(2)
│       │   ├── slowFib(1)
│       │   └── slowFib(0)
│       └── slowFib(1)
└── slowFib(4)
    ├── slowFib(3)
    │   ├── slowFib(2)
    │   │   ├── slowFib(1)
    │   │   └── slowFib(0)
    │   └── slowFib(1)
    └── slowFib(2)
        ├── slowFib(1)
        └── slowFib(0)

Other uses for closures in JavaScript you may want to explore include:

- Creating factory functions that return new functions with specific behavior.
- Creating iterators that maintain their state across multiple invocations.
- Allowing callbacks to maintain access to variables from the enclosing scope.
- The module pattern, encapsulating private state and exposing a public API.
- Partial application and currying, which involve fixing a few arguments of a
function and generating a new function.
*/
