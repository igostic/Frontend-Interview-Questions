function customSet(object, path, value) {
  // Convert the path to an array if it's not already
  const pathArray = Array.isArray(path) ? path : path.split(".");

  // Use reduce to traverse the object using the pathArray
  pathArray.reduce((acc, key, index) => {
    // Check if it's the last key in the path
    if (index === pathArray.length - 1) {
      // Set the value if it's the last key in the path
      acc[key] = value;
    } else {
      // Create nested objects if the key doesn't exist
      acc[key] = acc[key] || {};
    }
    // Return the next level of the object for the next iteration
    return acc[key];
  }, object);

  // Return the modified object
  return object;
}

const obj2 = {
  a: {
    b: {
      c: 42,
      d: {
        e: 99,
      },
    },
    f: [10, 12, 13],
  },
};

// Set a value at the path "a.b.d.h[0]" to 77.
set(obj2, "a.b.d.h.0", 77);
