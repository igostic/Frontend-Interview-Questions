function deepEquals(val1, val2) {
  // Base case: If the values are strictly equal, return true
  if (val1 === val2) return true;

  // If the types are different, they can't be equal
  if (typeof val1 !== typeof val2) return false;

  // If either value is not an object, they can't be equal
  if (typeof val1 !== 'object' || typeof val2 !== 'object') return false;

  // Get the keys of both objects
  const keys1 = Object.keys(val1);
  const keys2 = Object.keys(val2);

  // If the number of keys is different, they can't be equal
  if (keys1.length !== keys2.length) return false;

  // Iterate through the keys
  for (const key of keys1) {
      // If a key from val1 is not present in val2, they can't be equal
      if (!keys2.includes(key)) return false;
      
      // Recursively check the values of the corresponding keys
      if (!deepEquals(val1[key], val2[key])) return false;
  }

  // If all checks pass, the values are deeply equal
  return true;
}

// Example 1: Comparing two simple objects
const obj1 = { a: 1, b: 2 };
const obj2 = { a: 1, b: 2 };
const obj3 = { a: 1, b: 3 };

console.log(deepEquals(obj1, obj2)); // Output: true
console.log(deepEquals(obj1, obj3)); // Output: false

// Example 2: Comparing nested objects
const nestedObj1 = { a: 1, b: { c: 2 } };
const nestedObj2 = { a: 1, b: { c: 2 } };
const nestedObj3 = { a: 1, b: { c: 3 } };

console.log(deepEquals(nestedObj1, nestedObj2)); // Output: true
console.log(deepEquals(nestedObj1, nestedObj3)); // Output: false

// Example 3: Comparing arrays
const arr1 = [1, 2, [3, 4]];
const arr2 = [1, 2, [3, 4]];
const arr3 = [1, 2, [3, 5]];

console.log(deepEquals(arr1, arr2)); // Output: true
console.log(deepEquals(arr1, arr3)); // Output: false

// Example 4: Comparing NaN with the string 'NaN'
console.log(deepEquals(NaN, 'NaN')); // Output: false
console.log(deepEquals(NaN, NaN)); // Output: false
console.log(deepEquals(NaN, 10)); // Output: false

const objX = {a:1, b:2};
const objY = {b:2, a:1};
console.log(deepEquals(objX, objY));

