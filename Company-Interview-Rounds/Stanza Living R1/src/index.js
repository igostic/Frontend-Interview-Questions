import "./styles.css";

// Given an array as inout add 1 to the array and return the
// modified array
//                    end
// input  = [3, 4, 5, 1]
// output = [3, 4, 5, 2]
// 3451 + 1
// input = [9, 9 , 9]
// output= [1, 0, 0, 0]

// function addOne(inp, val){
//   let len = inp.length;
//   if(inp[len - 1] < 9){
//     inp[len - 1] += val;
//     return inp;
//   }
//   let carry = 1;
//   inp[len - 1] = 0;
//   for(let i = inp.length - 2; i >=0 ; i--){
//     if(carry === 1 && inp[i] < 9){
//       inp[i] += val;
//       carry = 0
//       break;
//     }else if(inp[i] === 9 && carry === 1){
//       inp[i] = 0
//       carry = 1;
//     }
//   }
//   if(carry === 1){
//     inp[0] = 0;
//     inp.unshift(1);
//   }
//   return inp;
// }

// console.log(addOne([3, 9, 5, 1], 1));
// console.log(addOne([3, 4, 5, 9], ));
// console.log(addOne([9, 9, 9, 9], ));
// console.log(addOne([2, 9, 9], ));

function addOne(inp, val) {
  const len = inp.length; // Get the length of the input array
  let sum,
    digit,
    carry = 0; // Initialize variables for sum, digit, and carry

  // Calculate the sum of the last element of inp and val
  sum = inp[len - 1] + val;
  digit = sum % 10; // Calculate the digit (units place) of the sum
  carry = Math.floor(sum / 10); // Calculate carry for next iteration
  inp[len - 1] = digit; // Update last element of inp with the digit

  // Iterate over the rest of the elements in reverse order
  for (let i = len - 2; i >= 0; i--) {
    sum = 0;

    // Check if there is a carry from the previous operation
    if (carry) {
      sum = inp[i] + carry; // Add carry to the current element
      carry = Math.floor(sum / 10); // Calculate carry for next iteration
      inp[i] = sum % 10; // Update current element with the new digit
    }
  }

  // If there's a carry remaining after the loop, add a 1 to the beginning of the array
  if (carry) {
    inp = [1, ...inp];
  }

  return inp; // Return the modified inp array
}

console.log(addOne([9, 9, 9, 9], 9)); // 1 - 9
console.log(addOne([3, 9, 5, 1], 1));
// console.log(1 == "1"); // true
// console.log(1 === "1"); // false

// for (var i = 0; i < 5; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, 0);
// }
// let i;
// for (i = 0; i < 5; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, 0);
// }
// const arr = [1, 2, 3, 4];
// let newArr = arr.map((eachItem) => {
//   return eachItem * eachItem;
// });
// console.log(arr, newArr);
