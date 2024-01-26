// https://learnersbucket.com/examples/interview/array-with-event-listeners-in-javascript/

// https://www.youtube.com/watch?v=3jKvw-iZOXk&list=PL_KW_uw2ITn84SjTLNQsugTU3hU4_EwLM&index=29&ab_channel=Learnersbucket

// Extend the arrays in javascript such that an event gets 
// dispatched whenever an item is added or removed


// Initialize an object to store event listeners
Array.prototype.listeners = {};

// Add a function to the Array prototype to add event listeners
Array.prototype.addListener = function(eventName, callback) {
  // Check if there are already listeners for this event
  if(this.listeners[eventName])
    // If so, push the new callback to the array of 
    // listeners for this event
    this.listeners[eventName].push(callback);
  else
    // If not, create a new array with the callback as 
    // the first element
    this.listeners[eventName] = [callback];
};

// Add a function to the Array prototype to push values 
// and trigger events
Array.prototype.pushWithEvent = function (eventName, values) {
  // Use the spread operator to push each value into the array
  this.push(...values);
  // Trigger the specified event with the added values
  this.triggerEvents(eventName, values);
};

// Add a function to the Array prototype to pop 
// values and trigger events
Array.prototype.popWithEvent = function(eventName) {
  // Get the latest value from the array
  const poppedValue = this.pop();
  // Trigger the specified event with the popped value
  this.triggerEvents(eventName, poppedValue);
};

// Add a function to the Array prototype to trigger events
Array.prototype.triggerEvents = function(eventName, value) {
  // Check if there are listeners for this event
  if(this.listeners[eventName]){
    // If so, loop through each callback and call 
    // it with the event name, value, and the array
    this.listeners[eventName].forEach((callback) => {
    // Call the callback function with the event name, 
    // value, and the current array instance ('this')
    callback(eventName, value, this);

    })
  }
}

// Input:
const arr = [];

// Add event listeners for 'add' and 'remove' events
arr.addListener('add', (eventName, items, array) => {
  console.log('items were added', items);
});

arr.addListener('remove', (eventName, item, array) => {
  console.log(item, ' was removed');
});

// Push values into the array with an event trigger
arr.pushWithEvent('add', [4, 5]);

// Pop a value from the array with an event trigger
arr.popWithEvent('remove');



// Output:
// "items were added again" // [object Array] (2)
// [4,5]

// 5 " was removed"