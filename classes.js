// Classes were added to JS in ES6 (2015), and essentially provide syntactic sugar for working with prototypal inheritance.

// Let's say we have an employee and a manager class defined with the 'class' syntax...
class Employee {
  constructor(age, nm) {
    this.age = age;
    this.name = nm;
  }
  email(recipient, message) {
    return `Dear ${recipient},\n${message}\nKind regards, ${this.name}`;
  }
}

class Manager extends Employee {
  giveFeedbackTo(name, feedback) {
    return `${name}, I'm going to be honest with you. ${feedback}`;
  }
  sayHello() {
    return `Hi, my name is ${this.name} and I'm a manager`;
  }
}
const steve = new Manager(40, 'Steve');
console.log(steve.sayHello())
console.log(steve.giveFeedbackTo('Sally', 'This javascript tutorial is going way over my head.'));

// Now let's create a Director to examine what this syntactic sugar is doing under the hood...

// We don't need our Director constructor to assign any additional properties
function Director () { }

// But we do want to add a method...
Director.prototype.receiveBonus = function () { return 'Why thank you very much.' }

// We can see that our Employee prototype contains the email method, and is therefore what we want to 'extend'...
console.log(Employee.prototype.email); // '[Function: email]'

// What is the 'parent' prototype of our Director function's prototype currently?
console.log(Object.getPrototypeOf(Director.prototype)); // 'Object: null prototype] {}' (The root Object prototype).

// We want to set re-assign this to reference the Employee prototype...
Director.prototype.__proto__ = Employee.prototype

const vincent = new Employee(35, 'Vincent');

console.log(vincent.age);
console.log(vincent.name);

const barbara = new Director(55, 'Barbara');
console.log(barbara.receiveBonus()); // 'Why thank you very much.'
console.log(barbara.email('Steve', "We're going to have to let you go."));

// A simpler way of doing this would be to call the parent's constructor within our subclass constructor like this:

function Developer (age, name) {
  Employee.call(this, age, name); // Equivalent to super() in classes
}
