/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#arrow_functions_used_as_methods
 * 
 * In most cases, the value of this is determined by how a function is called (runtime binding). 
 * It can't be set by assignment during execution, and it may be different each time the function is called. 
 * ES5 introduced the bind() method to set the value of a function's this regardless of how it's called, 
 * and ES2015 introduced arrow functions which don't provide their own this binding (it retains the 'this' value of the enclosing lexical context).

 * In my own words: in an arrow function the 'this' keyword is inherited from its lexical scope during definition.
 * In other cases, 'this' binds to the function's invoker during runtime.
 */

/**
 * EXAMPLE ONE
 */

class Person {
    constructor(name) {
        this.name = name;
    }

    // Traditional function declaration: a new lexical/local scope is created and 'this' binds to Person
    printNameArrow() {
        // Arrow function does not bind its own 'this'. setTimeout() is a fn call and does not create its own lexical scope.
        // Nearest 'this' is used which is the inherited 'this' from printNameArrow()
        setTimeout(() => {
            console.log('Arrow: ' + this.name);
        }, 100);
    }

    printNameFunc() {
        // Function executes on the window scope since setTimeout(fn) === window.setTimeout(fn) and 'this' refers to window
        setTimeout(function () {
            console.log('Function: ' + this.name);
        }, 100);
    }
}

const person = new Person('Hubie');
person.printNameArrow(); // 'Hubie'
person.printNameFunc(); // undefined
const printNameArrowUnscoped = person.printNameArrow; // Unscope printNameArrow() by removing it from the context of person object
// printNameArrowUnscoped(); // error

/**
 * EXAMPLE TWO
 */

// Object literals do not create new scopes, only functions do
const cat = {
    name: 'Hubie',

    // If executed as cat.meow(), 'this' binds to invoker i.e. cat
    meow: function () {
        console.log('I am ' + this.name);
    },

    // Defined in the global context, 'this' defaults to window
    meowArrow: () => {
        console.log('I am ' + this.name);
    },

    // Function creates a fn that inherits its 'this'
    // If executed as cat.meowArrowScoped(), 'this' binds to cat and scopedMeow retains same 'this'
    meowArrowScoped: function () {
        const scopedMeow = () => {
            console.log('I am ' + this.name);
        };
        return scopedMeow;
    },
};

cat.meow(); // I am Hubie
cat.meowArrow(); // I am undefined
cat.meowArrowScoped()(); // I am Hubie
