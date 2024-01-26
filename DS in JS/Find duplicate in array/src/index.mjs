var findDuplicate1 = function(nums) {
  const seen = new Set();
  for (const num of nums) {
      if (seen.has(num)) {
          return num;
      }
      seen.add(num);
  }
  return -1;
}
// The do-while loop allows us 
//to perform this process at 
// least once, even if the 
// condition slow !== fast is 
// initially false. This is 
// necessary because, if we 
// didn't use a do-while 
// loop and relied on a 
// regular while loop, 
// we might miss the 
// intersection point 
// if the cycle starts 
// immediately at index 0.
function findDuplicate(arr) {
   // Initialize slow pointer 
   // at the first element
  let slow = arr[0];
  // Initialize fast pointer 
  // at the first element
  let fast = arr[0]; 
  
  // Phase 1: Detect the 
  //intersection point of 
  // the two pointers
  do {
    // Move slow one step
      slow = arr[slow]; 
    // Move fast two steps
      fast = arr[arr[fast]];
    // Continue until they meet 
  } while (slow !== fast); 
  
  // Reset fast pointer to 
  // the beginning of the array
  fast = arr[0]; 
  
  // Phase 2: Find the start of 
  // the cycle (duplicate element)
  while (slow !== fast) {
    // Move slow one step
      slow = arr[slow]; 
    // Move fast one step
      fast = arr[fast]; 
  }
  // Return the duplicate element
  return slow; 
}


// let arr1 = [1,1,4,5,2];
let arr2 = [2,5,9,6,9,3,8,9,7,1]
const num1 = findDuplicate1(arr2);
const num2 = findDuplicate(arr2);

console.log(num1);
console.log(num2);
