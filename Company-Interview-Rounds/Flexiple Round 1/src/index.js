import "./styles.css";

// Given an unsorted array, leftSum is defined as sum of all elements to the left of an element including the element
// and rightSum is defined as sum of all elements to the right of an element.

// Write a function that returns the minimum absolute difference between leftSum and rightSum.

// Example:

// Input: arr = [3,1,2,4,3]

// Output: 1

// Explanation:
// For index 0, leftSum = 3, rightSum = 10. Absolute difference = 7.
// For index 1, leftSum = 4, rightSum = 9. Absolute difference = 5.
// For index 2, leftSum = 6, rightSum = 7. Absolute difference = 1.
// For index 3, leftSum = 10, rightSum = 3. Absolute difference = 7.

// Minimum absolute difference = 1.

// ---------------------------------------------------------------------------------------------------------------------------------------------

// better solution
// https://gist.github.com/harshithjv/bcecbc4ae40d0a20c4dcb2399dee7f1a
let arr = [3, 1, 2, 4, 3];
function minDiff(arr) {
  let n = arr.length;
  let prefixSum = [];
  for (let i = 0; i < n; i++) prefixSum[i] = 0;
  prefixSum[0] = arr[0];
  for (let i = 1; i < n; i++) {
    prefixSum[i] = prefixSum[i - 1] + arr[i];
  }
  let i = 0,
    j = n - 1;
  let res = Infinity;
  while (i < n) {
    let leftSum = prefixSum[i];
    let rightSum = prefixSum[j] - prefixSum[i];
    let diff = Math.abs(leftSum - rightSum);
    res = Math.min(res, diff);
    i++;
  }
  console.log(res);
}
minDiff(arr);
