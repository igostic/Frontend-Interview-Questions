function one(element, eventType, eventHandler) {
  // Define an inner function named 'wrapper'
  function wrapper() {
    // Call the original event handler 
    // with the correct context
    // Execute the event handler
    eventHandler.call(this); 
    
    // Remove the event listener 
    // after it's been executed once
    // Remove the event listener
    element.removeEventListener(eventType, wrapper); 
  }

  // Attach the 'wrapper' function as an event listener
  element.addEventListener(eventType, wrapper);
}

// Get a reference to an HTML 
// element with the ID 'myButton'
const myButton = document.getElementById('myButton');

// Call the 'one' function to attach a one-time event handler to the button
one(myButton, 'click', function() {
  console.log('Button clicked!');
});
