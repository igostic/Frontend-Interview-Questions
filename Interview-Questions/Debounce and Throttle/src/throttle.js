/**
 * Implement Simple Throttle function
 *
 * Lodash reference: https://lodash.com/docs/4.17.15#throttle
 *
 * The throttle function takes in a "func" and "wait" 
//  * time as parameters.
 * The execution of "func" happens at most once within 
//  the "wait" period.
 * When "func" is triggered, it is called with the 
//  last arguemnts supplied to
 * throttle at the time it was triggered.
 */

let inpSearch = document.getElementById("search");
function handleSearch(event) {
  console.log(event.target.value);
}
// let throttleSearch = throttle(handleSearch, 1000);
// inpSearch.addEventListener("keyup", handleSearch);
// inpSearch.addEventListener("keyup", throttleSearch);

// Throttle function to limit the
// execution of the provided
// function (func) to once within
// the specified wait time.
function throttle(func, wait) {
  // Flag to track whether we
  // are currently throttling
  let throttling = false;
  // Return a throttled version
  // of the original function
  return function (...args) {
    // If currently throttling,
    // skip the execution of func
    if (throttling) {
      return;
    }
    // Set the throttling flag to
    // true to indicate that func
    // is being executed
    throttling = true;
    // Schedule unsetting the
    // throttling flag after the
    // specified "wait" time
    setTimeout(() => {
      throttling = false;
    }, wait);

    // Call the original
    // function (func) with the
    // provided arguments using
    // the spread syntax
    func(...args);
  };
}

function throttleWithoutSetTimeout(fn, interval) {
  // Variable to track the last
  // time the function was called
  var lastTime = 0;
  // Return a throttled version
  // of the original function
  return function (...args) {
    // Get the current timestamp
    var now = Date.now();

    // If time elapsed since last
    // function call is greater
    // than or equal to interval
    if (now - lastTime >= interval) {
      // Call the original function
      // with the provided arguments
      fn(...args);
      // Update the lastTime to
      // the current timestamp
      lastTime = now;
    }
  };
}

// Example usage
const throttledFunction = throttleWithoutSetTimeout(function () {
  console.log("Throttled function called");
}, 1000);

// Trigger the throttled function
throttledFunction();

let throttleSearch = throttleWithoutSetTimeout(handleSearch, 1000);
inpSearch.addEventListener("keyup", throttleSearch);

// function doLog(x) {
//   console.log("log called", x);
// }

// const test = throttle(doLog, 300);

// test(1); // calls doLog(1);
// test(2); // does not trigger.
// test(3); // does not trigger

// setTimeout(() => {
//   test(4); // calls doLog(4);
//   test(5); // does not trigger;
// }, 400);
