/*
How can we leverage OOP in JavaScript? At its core, JavaScript has no concept of classes like the 'classical' OOP
languages e.g. Java or C++ Instead, it uses prototypal inheritance, and the prototype chain. 

Let's say we wanted to build a simple game with many users, and their associated functionality.
We wouldn't want to create users manually each time we needed to do so, like this:
*/

const userOne = {};
userOne.name = 'Bob';
userOne.score = 0;
userOne.increment = function () {
  userOne.score += 1;
};

/*
That would be crazy as our game grows to include thousands of users.
To enable us to create users programmatically, we could leverage the factory function pattern:
*/

function userCreator(name) {
  const newUser = {};
  newUser.name = name;
  newUser.score = 0;
  newUser.increment = function () {
    newUser.score += 1;
  };
  return newUser;
}

// Now we can easily create our users like this:

const user3 = userCreator('Bob');
const user4 = userCreator('Alice');

/*
This is better, but the problem is that each object returned by userCreator contains a unique version of the increment
method. This is not memory efficient. Since all user objects need to have the exact same methods, defining the methods
in one single location in memory would be better design:
*/

const userFunctionStore = {
  increment: function () {
    this.score += 1;
  },
  login: function () {
    console.log('Logged in.');
  },
};

function userCreator2(name) {
  const newUser = Object.create(userFunctionStore);
  newUser.name = name;
  newUser.score = 0;
  return newUser;
}

/*
In this example, we have stored our shared methods in a single object, userFunctionStore. In our updated factory
function, we now create our empty newUser object using Object.create with an argument of userFunctionStore. This creates
a prototypal bond between the object that it returns (in this case newUser) and the object that contains our user
methods. 

We can in fact see this bond on the returned newUser object:
*/

const user5 = userCreator2('Bjarne');
console.log(user5.__proto__); // '{ increment: [Function: increment], login: [Function: login] }'

/*
A special property on our user5 object, .__proto__ (pronounced 'dunder proto') has been set to point to our
userFunctionStore object. user5's 'prototype' is now userFunctionStore.
*/

console.log(user5.__proto__ === userFunctionStore); // 'true'

// The use of .__proto__ is deprecated however, and we should use Object.getPrototypeOf() instead:

console.log(Object.getPrototypeOf(user5) === userFunctionStore); // 'true'

/*
If we now call any of our user methods on user5, the JavaScript engine will first look to see if that method is stored
on the user5 object. Since it will not find it there, it then looks up user5's 'prototype chain' - its .__proto__
property. It finds it as a property of that object, and executes the function.
*/

user5.login(); // 'Logged in.' => the login function exists only on userFunctionStore

/*
If login was not stored as a property of userFunctionStore, the JavaScript engine would check the prototype object of
userFunctionStore to see if it can find it there. The engine would continue to look up the prototype chain in this
fashion until it came to a prototype object whose .__proto__ property was itself assigned to null. This way, the
prototype chain allows for multi-level inheritance in JavaScript.

We can see an example of a null prototype on a brand new empty object.
*/

const obj = {};
console.log(Object.getPrototypeOf(obj)); // '[Object: null prototype] {}'

/*
What we just logged is the root prototype of all objects in JavaScript.

In order to make these factory functions more succinct to write, and in order to make the paradigm more intuitive to
developers coming from the classical OOP languages, JavaScript was designed with a keyword that automates some of this
functionality - 'new':

In this third example, we create a 'constructor function':
*/

const UserCreator3 = function (name) {
  this.name = name;
  this.score = 0;
};

/*
In order to achieve the same prototypal bond to our shared methods, we make use of a property that exists on all
JavaScript functions called .prototype. By default, the .prototype object points to an empty object. We can create
properties on that object which store our methods:
*/

UserCreator3.prototype.increment = function () {
  this.score += 1;
};
UserCreator3.prototype.login = function () {
  console.log('Logged in.');
};

// When we now call our constructor function with the new keyword like this:

const user6 = new UserCreator3('Brendan');

/*
The new keyword automates four things for us: 

1. It creates an empty object.
2. It sets that object's .__proto__ property to the .prototype property of the function.
3. It binds the 'this' keyword to the newly created object.
4. After the last line of the function, it returns the object. 

This explains how we've done away with the first and last lines that were present in userCreator2.
*/

user6.login(); // 'Logged in.' => the login function exists only on the UserCreator3.prototype object
console.log(Object.getPrototypeOf(user6)); // '{ increment: [Function (anonymous)], login: [Function (anonymous)] }'
console.log(Object.getPrototypeOf(user6) === UserCreator3.prototype); // 'true'

/*
A key point to note here is that UserCreator3 can be called without the new keyword, like any function in JavaScript.
This is dangerous, since doing so would result in the 'this' keyword being bound to the global object, from which the
function was called. In our case, .name and .score would be assigned as properties of the global object. For this
reason, constructor function names are capitalised by convention, to indicate that they should only be called with the
new keyword.

Finally, we can arrive at the modern standard of ES6 class syntax, which provides syntactic sugar for prototypal
inheritance:
*/

class User {
  constructor(name) {
    // The constructor equates to our UserCreator3 constructor function
    this.name = name;
    this.score = 0;
  }

  increment() {
    // Methods that we define within the class are assigned to the prototype of User
    this.score += 1;
  }

  login() {
    // Equivalent to assigning this function definition to User.prototype.login
    console.log('Logged in.');
  }
}

const user7 = new User('Guido');
console.log(user7.score); // '0'
user7.increment();
console.log(user7.score); // '1'
console.log(User.prototype.increment); // '[Function: increment]'
console.log(Object.getPrototypeOf(user7) === User.prototype); // 'true'

/*
Despite the familiar syntax of the 'class' and 'new' keywords, under the hood ES6 classes still use the same underlying
prototype chain to create objects and to establish relationships of inheritance. 
*/
