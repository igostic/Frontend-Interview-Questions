/**
 * Implement Simple Debounce function
 *
 * Lodash reference: https://lodash.com/docs/4.17.15#debounce
 *
 * The debounce function takes in a "func" 
//  * and "wait" time as parameters.
 * The execution of "func" is delayed by 
//  "wait" amount of time. When the function
 * is triggered again before "wait" time elapses, 
//  the timer is reset.
 * The "func" is called with the last arguments 
//  provided to the debounced function.
 */

let inpSearch = document.getElementById("search");
function handleSearch(event) {
  console.log(event.target.value);
}
let debounceSearch = debounce(handleSearch, 1000);
// inpSearch.addEventListener("keyup", handleSearch);
inpSearch.addEventListener("keyup", debounceSearch);

// Using an arrow function here
// ensures that the 'this'
// value inside the setTimeout
// callback refers to the 'this'
// value of the surrounding
// lexical scope,
// maintaining the context of
// the original debounced func.
function debounce(func, wait) {
  let timer = null;
  // The new function can take any
  // number of arguments and pass them
  // to the original function
  // using the spread syntax (...args).
  return function (...args) {
    if (timer !== null) {
      clearTimeout(timer);
    }
    // Using an arrow function here
    // ensures that 'this' inside
    //  the setTimeout
    // callback refers to the 'this'
    // value of the debounce function.
    timer = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

// using arrow functions

// Using arrow functions in this
// debounce implementation ensures
// that 'this' inside the setTimeout
// callback refers to the 'this'
// value of the surrounding lexical scope,
// maintaining the context of the
// original debounced function.
// let debounceArrow = (callbackFn, delay) => {
//   let timer;

//   // The returned arrow function can
//   // take any number of arguments
//   // and pass them to the original
//   // function using the spread
//   // syntax (...args).
//   return (...args) => {
//     if (timer) {
//       clearTimeout(timer);
//     }

//     // Using an arrow function
//     // inside setTimeout ensures
//     // that 'this' inside the callback
//     // refers to the 'this' value
//     //  of the debounceArrow function.
//     timer = setTimeout(() => {
//       callbackFn(...args);
//     }, delay);
//   };
// };

// let debounceSearch = debounceArrow(handleSearch, 1000);
// // inpSearch.addEventListener("keyup", handleSearch);
// inpSearch.addEventListener("keyup", debounceSearch);
// function doLog(x) {
//   console.log("log called", x);
// }

// const test = debounce(doLog, 300);
// // const testArrow = debounceArrow(doLog, 300);

// test(1); // does not trigger.
// test(2); // does not trigger.
// test(3); // calls doLog(3);
// setTimeout(() => {
//   test(4); // calls doLog(4);
// }, 400);
