import "./styles.css";

// Find a pivot in an array such that  sum of left 
// array is equal to right arrray in javascript

function findPivot(arr) {
  let totalSum = arr.reduce(
      (acc, num) => acc + num, 0);
  let leftSum = 0;

  for (let i = 0; i < arr.length; i++) {
      totalSum -= arr[i];
      
      if (leftSum === totalSum) {
          return i; // Found pivot at index i
      }
  // add in the end, so that we
  // can check if before adding
  // curr value it's equal or not
      leftSum += arr[i];
  }

  return -1; // No pivot found
}

let arr = [1, 7, 3, 6, 5, 6];
let pivotIndex = findPivot(arr);
console.log(pivotIndex);