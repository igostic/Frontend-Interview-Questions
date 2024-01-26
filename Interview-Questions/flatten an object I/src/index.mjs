const flattenObject = (input, keyName) => {
  // Initialize an empty object to
  // store the flattened result
  var result = {};

  // Iterate through the keys of the input object
  for (const key in input) {
    // Create a new key by concatenating
    // the provided keyName (if any) with the current key
    const newKey = keyName ? `${keyName}_${key}` : key;

    if (Array.isArray(input[key])) {
      // If the value is an array, convert it
      // to an object with numeric keys
      const { ...arrToObj } = input[key];
      console.log({ arrToObj });
      // Recursively call flattenObject on the new object
      const newObj = flattenObject(arrToObj, newKey);
      // Merge the result into the main result object
      result = { ...result, ...newObj };
    }
    // Check if the value of the current
    // key is an object (and not an array)
    else if (typeof input[key] === "object" && !Array.isArray(input[key])) {
      // If it is, recursively call
      // flattenObject with the sub-object
      // and new key
      // Merge the result with the
      // current result using the spread operator
      result = { ...result, ...flattenObject(input[key], newKey) };
    } else {
      // If the value is not an object,
      // assign it to the newKey in the result object
      result[newKey] = input[key];
    }
  }

  // Return the flattened object
  return result;
};

const input = {
  name: "Neeraj",
  age: 25,
  department: {
    name: "Growth POC",
    section: "Developer",
    branch: {
      name: "Bangalore",
      timezone: "IST",
    },
  },
  company: {
    name: "Phonepe",
  },
  skills: ["javascript", "abc"],
};

const flattenInput = flattenObject(input);
console.log(flattenInput);
