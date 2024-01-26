import "./styles.css";

let input = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
  e: {
    f: {
      g: 4,
      h: null,
      i: undefined,
    },
  },
};

// Output
// {
//   a: 1
//   c: 2,
//   d: 3,
//   g: 4,
//   h: null,
//   i: undefined
// }

function flattenObject(input) {
  // If the input is not an object or is null, return it as is
  if (typeof input !== "object" || input === null) return input;

  // Initialize an empty object to store the flattened result
  let flattened = {};

  // Iterate through the keys of the input object
  for (const key in input) {
    // Get the value associated with the current key
    const val = input[key];

    // Recursively call `flattenObject` on the value
    const flatVal = flattenObject(val);

    // If the flattened value is an object (and not null),
    // merge it with the current result
    if (typeof flatVal === "object" && flatVal !== null) {
      flattened = { ...flattened, ...flatVal };
    } else {
      // If the value is not an object, assign it to the
      // current key in the result object
      flattened[key] = flatVal;
    }
  }

  // Return the flattened object
  return flattened;
}

console.log(flattenObject(input));
