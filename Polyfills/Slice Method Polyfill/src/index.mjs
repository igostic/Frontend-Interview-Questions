import "./styles.css";

Array.prototype.mySlice = (arr, start, end) =>  {
  // Check if arr is an array
  if (!Array.isArray(arr)) {
    throw new TypeError("Argument must be an array");
  }
  const result = [];
  const length = arr.length;
  // Set default values for start and end if not provided
  let startIndex = start || 0;
  let endIndex = end || length;

  // Handle negative indices
  if (startIndex < 0) {
    startIndex = Math.max(length + startIndex, 0);
  }
  if (endIndex < 0) {
    endIndex = Math.max(length + endIndex, 0);
  }
  for (let i = startIndex; i < endIndex; i++) {
      result.push(arr[i]);
  }

  return result;
}

const fruits = ["apple", "banana", "cherry", "date", "elderberry"];
const slicedFruits = fruits.mySlice(fruits);
console.log(slicedFruits); // Output: ["banana", "cherry", "date"]