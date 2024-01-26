let intervalCounter = 0;
let intervalsToBeExecuted = {};

function mySetInterval(callback, delay, ...args) {
  if (typeof callback !== 'function') 
    throw new Error("callback not a function");

  let intervalId = intervalCounter++;
  intervalsToBeExecuted[intervalId] = {
    callback: callback,
    delay: delay,
    args: [...args],
    nextExecutionTime: Date.now() + delay  // Set the next execution time
  }
  return intervalId;
}

function myClearInterval(intervalId) {
  if (intervalsToBeExecuted[intervalId])
    delete intervalsToBeExecuted[intervalId];
}

function processIntervals() {
  for (let intervalId in intervalsToBeExecuted) {
    if (intervalsToBeExecuted.hasOwnProperty(intervalId)) {
      if (Date.now() >= intervalsToBeExecuted[intervalId].nextExecutionTime) {
        const { callback, delay, args } = intervalsToBeExecuted[intervalId];
        // Update the next execution time
        intervalsToBeExecuted[intervalId].nextExecutionTime = Date.now() + delay;
        callback(...args);
      }
    }
  }
  // Use requestAnimationFrame for smoother execution
  requestAnimationFrame(processIntervals);
}
// Start processing intervals
requestAnimationFrame(processIntervals);

// Usage example:
// console.log("Start");
// let intervalId = mySetInterval(console.log, 1000, "setInterval1");
// // myClearInterval(intervalId);
// setTimeout(() => myClearInterval(intervalId), 5000); // Clear the interval after 5 seconds

