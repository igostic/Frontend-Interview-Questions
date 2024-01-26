// Method - 1
// Define a currying function called curry1
const curry1 = (fn) => {
  // Define the curried function
  // that takes any no. of args
  const curriedFn = (...args) => {
    // Check if the number of
    // arguments is greater than
    // or equal to the function's arity
    if (args.length >= fn.length) {
      // If there are enough
      // arguments, call the original
      // function with the arguments
      return fn(...args);
    } else {
      // If there are not enough
      // arguments, return a new
      // function that takes
      // more arguments
      return (...moreArgs) => {
        // Recursively call the
        // curried function with
        // the existing and new
        // arguments
        // The return is essential to
        // propagate the recursive call's
        // result outward, maintaining
        // currying functionality.
        return curriedFn(...args, ...moreArgs);
      };
    }
  };
  // Return the curried function
  return curriedFn;
};

function curry(func) {
  // args takes arguments in the form of array eg - [a, b, c]
  return function curriedFunc(...args) {
    //check if current args passed equals the number of args function expects
    if (args.length >= func.length) {
      // if yes, we spread args elements to pass into func (spread). This is our base case.
      return func(...args);
    } else {
      /* if not, we return a function that collects the next arguments passed in next and 
      we recursively call curriedFunc, accumulating and spreading the values of args first and then
      the values of next. next will take into consideration a variable amount of next arguments
      e.g (1, 2) (1) (1,2,3) */
      return function (...next) {
        return curriedFunc(...args, ...next);
      };
    }
  };
}
// Method -2
// const curry2 = (fn) => {
//   const curriedFn = (...args) => {
//     if (args.length === fn.length) {
//       return fn.apply(this, args);
//     } else {
//       return (...moreArgs) => {
//         return curriedFn.apply(this, [...args, ...moreArgs]);
//       };
//     }
//   };
//   return curriedFn;
// };

// // Method - 3

// const curry3 = (fn) => (...args) =>
//   args.length === fn.length
//     ? fn(...args)
//     : (...moreArgs) => curry3(fn)(...args, ...moreArgs);

const add = (a, b, c) => {
  return a + b + c;
};

const curriedFn3 = curry(add);

console.log(curriedFn3(1, 2, 3));
console.log(curriedFn3(1, 2)(3));
console.log(curriedFn3(1)(2)(3));

// const curriedFn2 = curry2(add);

// console.log(curriedFn2(1,2,3));
// console.log(curriedFn2(1,2)(3));
// console.log(curriedFn2(1)(2)(3));

// const curriedFn = curry1(add);

// console.log(curriedFn(1,2,3));
// console.log(curriedFn(1,2)(3));
// console.log(curriedFn(1)(2)(3));

//partial application example
// const addPartial = (x, y, z) => {
//   return x + y + z;
// };

// var partialFunc = addPartial.bind(this, 2, 3);
// console.log(partialFunc(4));
