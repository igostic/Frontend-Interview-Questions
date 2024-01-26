// This function acts as a recursive helper for setting
// values in nested objects/arrays.
const helper = (obj, path, value) => {
  // Destructuring assignment: current takes the first
  // element of path, rest takes the remaining elements.
  const [current, ...rest] = path;

  if (rest.length > 0) {
    // If there are more keys to process in the path:
    if (!obj[current]) {
      // If the current key doesn't exist in obj, create
      // an empty array or object based on the next key.
      const isNumeric = `${+rest[0]}` === rest[0];
      obj[current] = isNumeric ? [] : {};
    }

    if (typeof obj[current] === "object") {
      // If the current key refers to an object, recursively
      // call helper with the remaining path.
      const isNumeric = `${+rest[0]}` === rest[0];
      obj[current] = helper(isNumeric ? [] : {}, rest, value);
    } else {
      // If the current key refers to something other than an
      // object (e.g., a value), recursively call helper.
      obj[current] = helper(obj[current], rest, value);
    }
  } else {
    // If this is the last key in the path, set the value.
    obj[current] = value;
  }

  // Return the modified object.
  return obj;
};

// This is the main function for setting values using a path.
const set = (obj, path, value) => {
  let pathArr = path;

  if (typeof pathArr === "string") {
    // If the path is a string, convert it into an
    // array of keys.
    pathArr = pathArr.replaceAll("[", ".").replaceAll("]", "").split(".");
  }

  // Call the helper function with the provided object,
  // path array, and value.
  helper(obj, pathArr, value);
};

// Example object for testing.
const obj2 = {
  a: {
    b: {
      c: 42,
      d: {
        e: 99
      }
    },
    f: [10, 12, 13]
  }
};

// Set a value at the path "a.b.d.h[0]" to 77.
set(obj2, "a.b.d.h[0]", 77);

// Output the modified object.
console.log(obj2);
