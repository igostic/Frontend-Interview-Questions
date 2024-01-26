/**
 * Implement a simple JSON.stringify()
 *
 * JSON -> https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
 * JSON.stringify()
 *  -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
 *
 * Create a function that returns a string which represents the JSON
 * structure of a given javascript object.
 *
 * Values to expect:
 * - strings
 * - boolean
 * - number
 * - arrays
 * - object
 * - undefined
 * - null
 */

function stringify(obj) {
  // handling null case
  if (obj === null) {
    return "null";
  }

  // handling undefined case
  if (typeof obj === "undefined") {
    return "undefined";
  }

  // handle strings, enclose in double quotes
  if (typeof obj === "string") {
    return `"${obj}"`;
  }

  // handle numbers and booleans,
  // return the string representation
  if (typeof obj === "number" || typeof obj === "boolean") {
    return `${obj}`;
  }
  // handle arrays, loop over every
  // single element
  if (Array.isArray(obj)) {
    let res = "[";
    for (let i = 0; i < obj.length; i++) {
      res += `${stringify(obj[i])},`;
    }
    //remove last comma
    res = `${res.substring(0, res.length - 1)}]`;
    return res;
  }

  // handle object, loop over keys and values.
  let res = `{`;
  for (let key in obj) {
    res += `"${key}":${stringify(obj[key])},`;
  }
  //remove last comma
  res = `${res.substring(0, res.length - 1)}}`;
  return res;
}

// test cases
// const testOne = { a: "hello", b: 420, c: false };
const testTwo = { foo: [1, 2, "a"], bar: { baz: true } };
// const testThree = ["world", testOne];
// const testFour = 5;
// const testFive = "test";

// console.log(stringify(testOne), JSON.stringify(testOne));
// console.log(stringify(testTwo), JSON.stringify(testTwo));
// console.log(stringify(testThree), JSON.stringify(testThree));
// console.log(stringify(testFour), JSON.stringify(testFour));
// console.log(stringify(testFive), JSON.stringify(testFive));

const testNull = null;
const testUndefined = undefined;
const testObject = { a: null, b: undefined, c: "hello" };

const stringifiedTestNull = stringify(testNull); // Output: 'null'
console.log(stringifiedTestNull); // Output: 'null'

const stringifiedTestUndefined = stringify(testUndefined); // Output: undefined
console.log(stringifiedTestUndefined); // Output: undefined

const stringifiedTestObject = stringify(testObject); // Output: {"a":null,"b":undefined,"c":"hello"}
console.log(stringifiedTestObject); // Output: {"a":null,"b":undefined,"c":"hello"}

const stringifiedTestTwo = stringify(testTwo);
console.log(stringifiedTestTwo);
