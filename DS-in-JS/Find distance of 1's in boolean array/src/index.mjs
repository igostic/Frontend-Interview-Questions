import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;


// TC = O(n^2)
function findMaxDistanceOfOnes(booleanArray) {
  // Initialize the max distance.
  let maxDistance = 0;

  // Iterate over the boolean array.
  for (let i = 0; i < booleanArray.length; i++) {
    // If the current element is 1, then find the distance to the next 1.
    if (booleanArray[i] === 1) {
      let distanceToNextOne = 0;
      for (let j = i + 1; j < booleanArray.length; j++) {
        console.log("-->>",i, j);
        if (booleanArray[j] === 1) {
          distanceToNextOne = j - i;
        } else{
          break;
        }
      }
      // Update the max distance if necessary.
      maxDistance = Math.max(maxDistance, distanceToNextOne);
      console.log(distanceToNextOne, maxDistance);
    }
  }

  // Return the max distance.
  return maxDistance;
}


// TC - O(n)
function findMaxDistanceOfOnesOptimized(booleanArray) {
  // Initialize the max distance and the current distance.
  let maxDistance = 0;
  let currentDistance = -1;

  // Iterate over the boolean array.
  for (let i = 0; i < booleanArray.length; i++) {
    // If the current element is 1, then update the current distance.
    if (booleanArray[i] === 1) {
      currentDistance++;
    } else {
      // If the current element is 0, then update the max distance if necessary.
      maxDistance = Math.max(maxDistance, currentDistance);

      // Reset the current distance.
      currentDistance = -1;
    }
  }

  // Update the max distance again if the current distance is greater than the max distance.
  maxDistance = Math.max(maxDistance, currentDistance);

  // Return the max distance.
  return maxDistance;
}


// Example Usage:
const booleanArray = [0, 1, 0, 0, 1, 1, 1, 1, 1, 1];
const result = findMaxDistanceOfOnes(booleanArray);
console.log(`The maximum distance between 1's is: ${result}`);

const resultOptimsed = findMaxDistanceOfOnesOptimized(booleanArray);
console.log(`The maximum distance between 1's is: ${resultOptimsed}`);


