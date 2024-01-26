let arr1 = [3, 1, 4, 3, 5, 2];
const arr2 = [4, 3, 2, 1, 5, 7, 8];

// TC and SC = O(n)

function nextSmallerToRight(arr) {
  // Create an empty array to store 
  // the next smaller elements
  const nextSmallerElement = [];
  // Create a stack to keep track 
  // of potential next smaller elements
  const stack = [];

  // Iterate through the array in reverse order
  for (let i = arr.length - 1; i >= 0; i--) {
    // Pop elements from the stack while 
    // they are greater than or equal to 
    // the current element
    while (stack.length > 0 && stack[stack.length - 1] >= arr[i]) {
      stack.pop();
    }
    // If the stack is empty, 
    // it means no smaller element exists
    if (stack.length === 0) {
      // Store -1 in the nextSmallerElement array
      nextSmallerElement[i] = -1;
    } else {
      // Store the top of the stack as 
      // the next smaller element
      nextSmallerElement[i] = stack[stack.length - 1];
    }
    // Push the current element onto the stack
    stack.push(arr[i]);
  }
  // Return the array of next smaller elements
  return nextSmallerElement;
}

function nextSmallerToLeft(arr) {
  // Create an empty array to store 
  // the next smaller elements
  const nextSmallerElement = [];
  // Create a stack to keep track 
  // of potential next smaller elements
  const stack = [];
  // Iterate through the array
  for (let i = 0; i < arr.length; i++) {
    // Pop elements from the stack 
    // while they are greater than 
    // or equal to the current element
    while (stack.length > 0 && 
      stack[stack.length - 1] >= arr[i]) {
      stack.pop();
    }

    // If the stack is empty, it 
    //means no smaller element exists
    if (stack.length === 0) {
      // Store -1 in the nextSmallerElement array
      nextSmallerElement[i] = -1;
    } else {
      // Store the top of the stack as
      // the next smaller element
      nextSmallerElement[i] = stack[stack.length - 1];
    }

    // Push the current element 
    // onto the stack
    stack.push(arr[i]);
  }

  // Return the array of next 
  // smaller elements
  return nextSmallerElement;
}

function nextGreaterToRight(arr) {
  // Create an empty array to 
  // store the next greater elements
  const nextGreaterElement = [];

  // Create a stack to keep track of 
  // potential next greater elements
  const stack = [];

  // Iterate through the array in reverse order
  for (let i = arr.length - 1; i >= 0; i--) {
    // Pop elements from the stack while they 
    // are less than or equal to the current element
    while (stack.length > 0 && stack[stack.length - 1] <= arr[i]) {
      stack.pop();
    }

    // If the stack is empty, it means no 
    // greater element exists
    if (stack.length === 0) {
      // Store -1 in the nextGreaterElement array
      nextGreaterElement[i] = -1;
    } else {
      // Store the top of the stack as the next greater element
      nextGreaterElement[i] = stack[stack.length - 1];
    }

    // Push the current element onto the stack
    stack.push(arr[i]);
  }

  // Return the array of next greater elements
  return nextGreaterElement;
}

function nextGreaterToLeft(arr) {
  // Create an empty array to store the 
  // next greater elements
  const nextGreaterElement = [];

  // Create a stack to keep track of 
  // potential next greater elements
  const stack = [];

  // Iterate through the array
  for (let i = 0; i < arr.length; i++) {
    // Pop elements from the stack while they are 
    // less than or equal to the current element
    while (stack.length > 0 && stack[stack.length - 1] <= arr[i]) {
      stack.pop();
    }

    // If the stack is empty, it means no greater element exists
    if (stack.length === 0) {
      // Store -1 in the nextGreaterElement array
      nextGreaterElement[i] = -1;
    } else {
      // Store the top of the stack as the next greater element
      nextGreaterElement[i] = stack[stack.length - 1];
    }

    // Push the current element onto the stack
    stack.push(arr[i]);
  }

  // Return the array of next greater elements
  return nextGreaterElement;
}


console.log("nextSmallerToRight ->",nextSmallerToRight(arr1));
console.log("nextSmallerToRight ->",nextSmallerToRight(arr2));
console.log("nextSmallerToLeft ->",nextSmallerToLeft(arr1));
console.log("nextSmallerToLeft ->",nextSmallerToLeft(arr2));
console.log("nextGreaterToRight ->",nextGreaterToRight(arr1));
console.log("nextGreaterToRight ->",nextGreaterToRight(arr2));
console.log("nextGreaterToLeft ->",nextGreaterToLeft(arr1));
console.log("nextGreaterToLeft ->",nextGreaterToLeft(arr2));

/*
Next Smaller Element to the Right

The intuition behind finding the 
next smaller element to the right 
is to maintain a stack of potential 
smaller elements while iterating 
through the array from right to left. 
As we encounter each element, we pop 
elements from the stack until we 
find an element smaller than or 
equal to the current element. 
This element becomes the next 
smaller element for the current 
element. If the stack is empty, 
it means no smaller element exists, 
and we store -1 in the 
nextSmallerElement array.

Next Smaller Element to the Left

The intuition behind finding the 
next smaller element to the left 
is similar to finding the next 
smaller element to the right, 
but we iterate through the array 
from left to right. As we encounter 
each element, we pop elements from 
the stack until we find an element 
smaller than or equal to the current 
element. This element becomes the 
next smaller element for the current 
element. If the stack is empty, 
it means no smaller element exists, 
and we store -1 in the 
nextSmallerElement array.

Next Greater Element to the Right

The intuition behind finding the 
next greater element to the right 
is similar to finding the next smaller 
element to the right, but we maintain 
a stack of potential greater elements 
instead of smaller elements. As we 
encounter each element, we pop elements 
from the stack until we find an element 
greater than or equal to the current element. 
This element becomes the next greater 
element for the current element. 
If the stack is empty, it means 
no greater element exists, and 
we store -1 in the 
nextGreaterElement array.

Next Greater Element to the Left

The intuition behind finding the 
next greater element to the left 
is similar to finding the next 
greater element to the right, 
but we iterate through the 
array from left to right. 
As we encounter each element, 
we pop elements from the stack 
until we find an element 
greater than or equal to the 
current element. This element 
becomes the next greater 
element for the current element. 
If the stack is empty, it 
means no greater element 
exists, and we store -1 in 
the nextGreaterElement array.
*/