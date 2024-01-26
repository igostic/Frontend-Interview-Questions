const arr = [[1, 2, undefined], [[[[3, null, 4]]]], [5, [6], [7]]];
// const arr = [1, 2];

// Output: [1,2, undefined, 3, null, 4, 5, 6, 7]

function flatRecursively(arr, newArr = []) {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) flatRecursively(arr[i], newArr);
    else newArr.push(arr[i]);
  }

  return newArr;
}

function flatIteratively(arr) {
  // Initialize an empty array to
  // hold the flattened elements
  const newArr = [];
  // Create a stack by making a
  // copy of the input array
  // to keep original array intact
  const stack = [...arr];

  // Continue as long as there are
  // elements in the stack
  while (stack.length) {
    // Pop the last element from the stack
    const next = stack.pop();
    // If the popped element is an array
    if (Array.isArray(next)) {
      // Push its contents onto the
      // stack for further processing
      stack.push(...next);
      console.log("stack-->", stack);
    } else {
      // If the element is not an array,
      //  add it to the result array
      newArr.push(next);
    }
  }

  // Reverse the result array and return it
  return newArr.reverse();
}

function customFlat(arr, level, newArr = []) {
  console.log("c", level);
  if (level === 0) return arr;
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i]))
      // Recursively flatten sub-arrays
      newArr.push(...customFlat(arr[i], level - 1, []));
    else newArr.push(arr[i]);
  }

  return newArr;
}

// let flattenArr = flatRecursively(arr, []);
let customArrFlat = customFlat(arr, 15, []);
// let flattenArrIteratively = flatIteratively(arr);
// console.log(flattenArr);
console.log("customArrFlat-->>", customArrFlat);
// console.log("iterative", flattenArrIteratively);
