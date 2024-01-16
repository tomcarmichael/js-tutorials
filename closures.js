// Closures are closely linked with scope, so let's start with reviewing scope in Javsascript.

// Functions have access to the variables defined outside of them.

const globalVar = 'Hello from the global scope.';

// I'm going to use an Immediately Invoked Function Execution, or IIFE ('iffy'), so I can succinctly call the function after declaring it.
(function () {
  console.log(globalVar);
})() // ''Hello from the global scope.'

// This is different from most other programming languages, and is possible because Javascript uses lexical scoping.
// Functions have access to variables that are in scope at the point of the code where they are defined, not where they are invoked.
// When our annonymous function was decalred on line 7, outerScoped was in scope.

// The dictionary definition of 'lexical' is 'relating to the words or vocabulary of a language'.
// In the case of programming languages, it refers to the fact that the scope of a variable is defined by its textual position in the source code.

// A function's lexical scope is stored in a hidden internal property known as the "scope chain".
// The scope chain is a list (or chain) of all the variable objects that the function can access.
// These variable objects are essentially collections of all the accessible variables, functions, and parameters.
// Each function has a reference to its own scope (variables defined within the function)...
//.. and the scopes of its parent functions - all the way up to the global scope.

// Let's discuss the 'execution context'.
// The execution context refers to the environment in which a piece of JavaScript code is executed.
// Our program begins in the Global execution context, and each time a function is invoked, a new execution context is created for that call.
// This execution context includes the function's scope chain, along with the 'this' binding and the arguments passed to the function.

function outerFunc() {
  const outerVar = 'Hello from the outerFunc scope.';
    function innerFunc() {
      const innerVar = 'Hello from the innerFunc scope.'
      console.log(innerVar); // Accessible
      console.log(outerVar); // Accessible through the current execution context's scope chain.
      console.log(globalVar); // Accessible through the current execution context's scope chain.
    }
    innerFunc();
}
outerFunc();


 
// Its important to note that the scope chain contains references (pointers) to the accessible variables, not copies.
// This way, variables can be modified and remain consistent across different execution contexts.
// Add example here ->

