// source => https://www.youtube.com/watch?v=gXIHJCCDJPQ&list=PL_KW_uw2ITn84SjTLNQsugTU3hU4_EwLM&index=32&ab_channel=Learnersbucket

// https://learnersbucket.com/examples/interview/get-object-value-from-string-path/

const get = (obj, stringPath) => {
  // If the path is empty or undefined, return undefined
  if (!stringPath || stringPath.length === 0) {
    return undefined;
  }

  // Define an array of characters to exclude from path
  const excludeCharacters = ["[", "]", "."];
  const keys = [];

  // Iterate through the characters in the path
  for (let i = 0; i < stringPath.length; i++) {
    if (!excludeCharacters.includes(stringPath[i])) {
      keys.push(stringPath[i]);
    }
  }

  // Use the Array.reduce() method to traverse the object based on the keys
  let value = keys.reduce((obj, key) => {
    return obj[key];
  }, obj);

  // Return the final value
  return value;
};

const obj = {
  a: {
    b: {
      c: [1, 2, 3]
    }
  }
};

console.log(get(obj, "a.b.c"));
console.log(get(obj, "a.b.c.0"));
console.log(get(obj, "a.b.c[1]"));
console.log(get(obj, ["a", "b", "c", "2"]));
console.log(get(obj, "a.b.c[3]"));
console.log(get(obj, "a.c"));

// Explanation:

// const get = (obj, stringPath) => {:

// This defines an arrow function named get that takes two parameters:
// obj: The object to search.
// stringPath: The path (as a string) to the property you want to retrieve.
// if (!stringPath || stringPath.length === 0) { return undefined; }:

// If the stringPath is empty or undefined, it means there's no path to
// follow, so it returns undefined.
// const excludeCharacters = ["[", "]", "."];:

// This creates an array of characters to be excluded from the path.
// These characters are [, ], and ..
// const keys = [];:

// This initializes an empty array called keys which will be used to
// store the individual keys derived from the path.
// for (let i = 0; i < stringPath.length; i++) { ... }:

// This loop iterates through the characters in the stringPath.
// if (!excludeCharacters.includes(stringPath[i])) { keys.push(stringPath[i]); }:

// For each character in the stringPath, if it is not in the excludeCharacters
// array, it is added to the keys array.
// let value = keys.reduce((obj, key) => { return obj[key]; }, obj);:

// This uses the Array.reduce() method to traverse the object based on the keys.
// It starts with the initial obj and iterates through each key, accessing
// the corresponding property in the object.
// return value;:

// This returns the final value found at the end of the path.
