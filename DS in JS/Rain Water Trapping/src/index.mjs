/* Initialize variables:
a. leftMax: Initially set to -1, 
representing the maximum height 
seen so far on the left side.
b. rightMax: Initially set to -1, 
representing the maximum height 
seen so far on the right side.
c. left: Initially set to 0, 
representing the index of the left pointer.
d. right: Initially set to 
the length of the height array minus 1, 
representing the index of the right pointer.
e. water: Initially set to 0, representing 
the total amount of trapped water calculated so far.

Enter the while loop:
a. The loop continues as 
long as left <= right, 
ensuring that the pointers 
don't cross each other.

Update maximum heights:
a. leftMax: If the height at 
the current left index is 
greater than the current 
leftMax, update leftMax 
to the current height.
b. rightMax: If the height 
at the current right index 
is greater than the current 
rightMax, update rightMax 
to the current height.

Calculate trapped water:
a. Compare leftMax and rightMax:
i. If leftMax is greater than or 
equal to rightMax, calculate the water 
trapped between the current right index 
and the rightMax barrier. Add this 
amount to the water variable.
ii. Decrement the right pointer 
to move towards the left.

b. Otherwise, rightMax must be greater 
than leftMax:
i. Calculate the water trapped between 
the current left index and the leftMax 
barrier. Add this amount to the 
water variable.
ii. Increment the left pointer to 
move towards the right.

Exit the while loop:
a. The loop terminates when left and 
right cross each other or meet, 
indicating that all potential water 
traps have been considered.

Return the total trapped water:
a. The water variable holds the total 
amount of rainwater trapped between 
the barriers represented by the 
height array.
*/

const trapRaintrappedWater = (height) => {
  // Initialize variables to track 
  // maximum heights and pointers
  // Max height seen so 
  // far on the left side
  let leftMax = -1; 
  // Max height seen so 
  // far on the right side
  let rightMax = -1; 
   // left pointer
  let left = 0;
  // right pointer
  let right = height.length - 1; 
  // Total amount of trapped 
  // trappedWater calculated so far
  let trappedWater = 0;

  // Continue as long as the pointers 
  // haven't crossed each other
  while (left <= right) {
    // Get the max wall height 
    // from both the ends
    // Update leftMax if necessary
    leftMax = height[left] > leftMax ? height[left] : leftMax; 
    // Update rightMax if necessary
    rightMax = height[right] > rightMax ? height[right] : rightMax; 

    // Calculate the amount of 
    // trappedWater trapped
    if (leftMax > rightMax) {
      // If leftMax is greater or 
      // equal to rightMax, 
      // calculate trappedWater 
      // trapped between right 
      // and rightMax
      trappedWater += rightMax - height[right];
      // Move right pointer towards left
      right--; 
    } else {
      // If rightMax is greater 
      // than leftMax, calculate 
      // trappedWater trapped 
      // between left and leftMax
      trappedWater += leftMax - height[left];
      // Move left pointer towards right
      left++; 
    }
  }

  return trappedWater;
};

let arr1 = [3, 0, 0, 2, 0, 4]; // 10
let arr2 = [4,2,0,3,2,5] // 9

console.log(trapRaintrappedWater(arr1));
console.log(trapRaintrappedWater(arr2));
