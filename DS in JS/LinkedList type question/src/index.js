import "./styles.css";

// Define a linked list represented as an object
let obj = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: null,
    },
  },
};

// Function to perform some logic on each node of the linked list
function logic(obj) {
  // Base case: If there's no next node, log the value and return
  if (obj.next === null) {
    console.log(obj.value);
    return;
  }

  // Check if the object has a property named 'next' (this condition seems incorrect)
  if (obj.hasOwnProperty(obj.next) !== null) {
    console.log(obj.value);
    obj = obj.next; // Move to the next node
    logic(obj); // Recursive call with the next node
  }
}

// Function to perform a mapping operation (although it doesn't actually do any mapping here)
function map(obj, callback) {
  callback(obj);
}

// Call the 'map' function with the linked list object and the 'logic' function as the callback
map(obj, logic);
