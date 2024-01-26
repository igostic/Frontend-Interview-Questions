/* Approach
When sum is greater than max, 
assign sum to max and 
temporarily store the 
maximum value. When 
sum is less than 0, 
it will start to 
accumulate again from 
0, and max must 
be the maximum value 
of the subarray at 
the end of the loop.
*/
var maxSubArray = function(nums) {
    // Initialize variables to keep 
    // track of the maximum sum 
    // and the current sum.
    // Initialize max to the 
    // first element in the array.
    let max = nums[0]; 
    let sum = 0;
  
    // Iterate through the array.
    for (let i = 0; i < nums.length; i++) {
        // Add the current element 
        // to the current sum.
        sum += nums[i];
  
        // If the current sum is 
        // greater than the maximum 
        // sum we've seen so far,
        // update the maximum sum.
        if (sum > max) {
            max = sum;
        }
  
        // If the current sum 
        // is negative, reset 
        // it to 0.
        if (sum < 0) {
            sum = 0;
        }
    }
  
    // After iterating through 
    // the entire array, 'max' 
    // will hold the maximum 
    // subarray sum.
    return max;
  };

const nums1 = [-2,1,-3,4,-1,2,1,-5,4];
console.log(maxSubArray(nums1));
// Output: 6
// Explanation: The subarray [4,-1,2,1] has the largest sum 6.