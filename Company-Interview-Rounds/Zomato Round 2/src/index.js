import "./styles.css";
function CustomFunction(callback) {
  // Callback function to be executed once promise is resolved
  let onRes;
  // Result of the resolved promise
  let res;
  // Flag to track if promise is resolved
  let isFulfilled = false;

  function resolve(value) {
    // Set flag to true indicating promise is resolved
    isFulfilled = true;
    // Store the resolved value
    res = value;
    // Execute callback if defined
    if (onRes) onRes(value);
  }

  function then(fn) {
    if (isFulfilled) {
      // If promise already resolved, execute callback immediately
      fn(res);
    } else {
      // Store callback to be executed later when promise resolves
      onRes = fn;
    }
  }

  // Execute the provided callback with resolve function
  callback(resolve);
  // Return an object with 'then' method for chaining
  return { then };
}

const promise = new CustomFunction((resolve, reject) => {
  console.log(1);
  resolve(2);
});

promise.then((res) => {
  console.log(res);
});

// 1
// 2

// sorted array , element => BS

// [1, 2, 3, 4, 5, 7] , key = 4
// low = 0
// high = 1, 2, 4, 8
// for(let i = 0; i <n; i++)
// 1, 2, 4, 8
// sn = 2^0 + 2^1 + 2^2 + 2^3 + .. + 2^i
// sn = a(r^n-1)/r-1
// r = 2
// sn = 1(2^i - 1)/2-1
// n = 2^i - 1(neglect)
// logn = i
