function customGet(object, path, defaultValue) {
  // Convert the path to an array if it's not already
  const pathArray = Array.isArray(path) ? path : path.split(".");

  // Use reduce to traverse the object using the pathArray
  const result = pathArray.reduce((acc, key) => {
    // Check if the current key exists in the current level of the object
    // If it exists, return the value, otherwise return undefined
    return acc && acc[key] !== undefined ? acc[key] : undefined;
  }, object);

  // Return the result if it exists, otherwise return the defaultValue
  return result || defaultValue;
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

console.log(customGet(obj2, "a.b.d.e"));
