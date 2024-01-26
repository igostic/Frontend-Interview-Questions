// Recursive DFS Polyfill for _.get
function get(obj, path, defaultValue, currentIndex = 0) {
  // Define an array of characters to exclude from path
  const excludeCharacters = ["[", "]", "."];
  const keys = [];

  // Iterate through the characters in the path
  for (let i = 0; i < path.length; i++) {
    if (!excludeCharacters.includes(path[i])) keys.push(path[i]);
  }

  // Get the current key to look for in the object
  const currentKey = keys[currentIndex];

  // Get the result at the current key
  const result = obj[currentKey];

  // If the result is undefined, return the default value
  if (result === undefined) {
    return defaultValue;
  }

  // If currentIndex is at the last index, return the result
  if (currentIndex === keys.length - 1) {
    return result;
  }

  // Recursively call get with the result and increment the currentIndex
  return get(result, path, defaultValue, currentIndex + 1);
}

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

const obj1 = {
  a: [
    {
      b: 2,
      d: 4,
    },
  ],
};

const result1 = get(obj1, ["a", 0, "b"]); // Output: 2
console.log(result1);
set(obj1, ["a", 0, "b", "e"], 3);
console.log(obj1);

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
const result = get(obj2, "a.b.d.e", "defaultValue");
const result2 = get(obj2, "a.f.2", "defaultValue");
console.log(result); // 99
console.log(result2); // 2
set(obj2, "a.b.d.h", 77);
console.log(obj2);

document.getElementById("exp").innerHTML = `
<div class="section">
  <h2>Explanation of get and set functions</h2>
  <div class="section">
    <h3>get Function</h3>
    <p>
      The get function retrieves a value from a nested object based on a provided path.
    </p>
    <div class="code">
      <pre>
        // Recursive DFS Polyfill for _.get
        function get(obj, path, defaultValue, currentIndex = 0) {
          // Define an array of characters to exclude from path
          const excludeCharacters = ['[', ']', '.'];
          const keys = [];
          
          // Iterate through the characters in the path
          for (let i = 0; i < path.length; i++) {
            if (!excludeCharacters.includes(path[i]))
              keys.push(path[i]);
          }
        
          // Get the current key to look for in the object
          const currentKey = keys[currentIndex];
          
          // Get the result at the current key
          const result = obj[currentKey];
        
          // If the result is undefined, return the default value
          if (result === undefined) {
            return defaultValue;
          }
        
          // If currentIndex is at the last index, return the result
          if (currentIndex === keys.length - 1) {
            return result;
          }
        
          // Recursively call get with the result and increment the currentIndex
          return get(result, path, defaultValue, currentIndex + 1);
        }
        
      </pre>
    </div>
  </div>
  <div class="section">
    <h3>Implementation:</h3>
    <ol>
      <li>
        <strong>Path Handling</strong>:
          The function accepts a path argument, which can be either an array of keys or a dot-separated string. It converts the path into an array of keys for uniform processing.
      </li>
      <li>
        <strong>Getting Current Key</strong>:
        It retrieves the current key to look for in the object.
      </li>
      <li>
        <strong>Getting Result</strong>:
        It attempts to get the value at the current key from the object.
      </li>
      <li>
        <strong>Base Conditions</strong>:
        If the result is undefined, it means the property doesn't exist. In this case, it returns the provided defaultValue. If currentIndex is at the last index, it returns the result. This indicates that we've reached the end of the path.
      </li>
      <li>
        <strong>Recursion</strong>:
        If none of the base conditions are met, it recursively calls get with the result and increments the currentIndex.
      </li>
    </ol>
  </div>
  ....................................................
  </div>

  <div class="section">
    <h3>Example 1: Using get</h3>
    <div class="code">
      <pre>
        const obj1 = {
          a: [
            { 
              b: 2 , d:4
            }
          ]
        };
        const obj2= {
          a: {
            b: {
              c: 42,
              d: {
                e: 99
              }
            }
          }
        };
        const result1 = get(obj1, ['a', 0, 'b']);
        console.log(result1); // <bold>2</bold>
        const result = get(obj2, 'a.b.d.e', 'defaultValue');
        console.log(result); // <bold>99</bold>
        </pre>
    </div>
    ....................................................
  </div>

<div class="section">
    <h2>Explanation of set function</h2>
    <div class="section">
      <h3>set Function</h3>
      <p>
        The set function updates or adds a value to a nested object at a specified path.
      </p>
      <div class="code">
        <pre>
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
                const isNumeric = '{+rest[0]}' === rest[0];
                obj[current] = isNumeric ? [] : {};
              }
          
              if (typeof obj[current] === "object") {
                // If the current key refers to an object, recursively
                // call helper with the remaining path.
                const isNumeric = '{+rest[0]}' === rest[0];
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
        </pre>
      </div>
    </div>
    <div class="section">
      <h3>Implementation:</h3>
      <ol>
        <li>
          <strong>Path Handling</strong>:
          Similar to get, it handles the path by converting it into an array of keys.
        </li>
        <li>
          <strong>Getting Current Key</strong>:
          It retrieves the current key.
        </li>
        <li>
          <strong>Base Conditions</strong>:
          If currentIndex is at the last index, it sets the value at that location. This indicates that we've reached the end of the path. If the current key doesn't exist or is not an object, it creates a new object. This ensures that we can continue to set values in nested properties.
        </li>
        <li>
          <strong>Recursion</strong>:
          It recursively calls set with the nested object and increments the currentIndex.
        </li>
      </ol>
    </div>
    ...
  </div>
  
  <div class="section">
    <h2>Example 2: Using set</h2>
    <div class="code">
      <pre>   
        const obj1 = {
          a: [
            { 
              b: 2 , d:4
            }
          ]
        };

        set(obj1, ['a', 0, 'b' , 'e'], 3);
        console.log(obj1);
        a: [
          {
            b : {
              e : 3
            },
            d : 4
          }
        ]

        ....................


        const obj2= {
          a: {
            b: {
              c: 42,
              d: {
                e: 99
              }
            }
          }
        };
        set(obj, 'a.b.d.f', 77);
        console.log(obj);
        {
          a: {
            b: {
              c: 42,
              d: {
                e: 99,
                f: 77
              }
            }
          }
        }
      </pre>
    </div>
`;
