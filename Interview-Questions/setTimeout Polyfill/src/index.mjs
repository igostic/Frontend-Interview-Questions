// This is the polyfill for setTimeout

// Counter to assign unique IDs to each timer
let counter = 0;

// Object to store callbacks along with their 
// execution time and arguments
let callbacksToBeExecuted = {};

// Function to mimic setTimeout
function mySetTimeout(callback, delay, ...args) {
  // Check if the callback is a function
  if (typeof callback !== 'function') 
    throw new Error("callback not a function");
  
  // Assign a unique ID to the timer
  let timerId = counter++;

  // Store the callback, execution time, and arguments
  callbacksToBeExecuted[timerId] = {
    callback: callback,
    time: Date.now() + delay,
    args: [...args]
  }

  // Return the ID of the timer
  return timerId;
}

// Function to mimic clearTimeout
function myClearTimeout(timer) {
  // Check if the timer ID exists in the 
  // callbacksToBeExecuted object
  if (callbacksToBeExecuted[timer])
    delete callbacksToBeExecuted[timer];
}

// Function to process and execute callbacks
function processCallbacks() {
  // Loop through the callbacksToBeExecuted object
  for (let cb in callbacksToBeExecuted) {
    if (callbacksToBeExecuted.hasOwnProperty(cb)) {
      // Check if it's time to execute the callback
      if (Date.now() >= callbacksToBeExecuted[cb].time) {
        const { callback, args } = callbacksToBeExecuted[cb];
        // Execute the callback with its arguments
        callback(...args); 
      } else {
        // If not, request the browser to call processCallbacks() 
        // when the call stack is empty
        // The window.requestIdleCallback() method queues a 
        // function to be called during a browser's idle periods.
        requestIdleCallback(processCallbacks);
      }
    }
  }
}

// Call processCallbacks() for the first time
requestIdleCallback(processCallbacks);

// Example usage
console.log("Start");
let timer = mySetTimeout(console.log, 1000, "setTimeout1");
console.log("end");
