// import "./styles.css";

// Implement mapLimit, a utility function that maps inputs through an asynchronous iteratee
// with a specified limit on concurrent operations.

// Inputs:
// - inputs: An array of inputs.
// - limit: The maximum number of operations at any one time.
// - iterateeFn: The async function called for each input to generate the corresponding output.
//      It takes two arguments:
//          - input: The input being processed.
//          - callback: A function called when the input is finished processing,
//              provided with one argument - the processed output.
// - callback: A function called with the array of outputs once all inputs are processed.

// Simulates an asynchronous request to get a user name by ID.
function getNameById(id, callback) {
  // simulating async request
  const randomRequestTime = Math.floor(Math.random() * 100) + 200;

  // Emulate an asynchronous request with a random delay.
  setTimeout(() => {
    // Call the callback with the processed output.
    callback("User" + id);
  }, randomRequestTime);
}

// Utility function to chop an array into smaller arrays of a given limit.
const chop = (inp, limit) => {
  let i = 0;
  let result = [];

  // Iterate through the input array and slice it into batches.
  while (i < inp.length) {
    result.push(inp.slice(i, i + limit));
    i += limit;
  }

  // Log the intermediate result for debugging purposes.
  console.log("res-->>", result);

  // Return the array containing sliced batches.
  return result;
};

// Main function for mapping inputs through an asynchronous iteratee function
// with a specified limit on concurrent operations.
function mapLimit(inputs, limit, iterateeFn, callback) {
  // Split the inputs into batches based on the specified limit.
  let chopped = chop(inputs, limit);
  console.log(chopped);
  
  // Use reduce and Promises to ensure sequential processing of batches.
  let finalRes = chopped.reduce((prev, curr) => {
    return prev.then((val) => {
      return new Promise((resolve, reject) => {
        let temp = [];

        // Process each input in the current batch concurrently.
        curr.forEach((e) => {
          // Call the iteratee function with each input.
          iterateeFn(e, (res) => {
            // Collect the processed results.
            temp.push(res);

            // Check if all inputs in the batch have been processed.
            if (temp.length >= curr.length) {
              // Resolve the promise with the accumulated results.
              resolve([...val, ...temp]);
            }
          });
        });
      });
    });
  }, Promise.resolve([]));

  // Once all batches are processed, call the final callback with the results.
  finalRes.then((res) => {
    callback(res);
  });
}

// Example usage:
mapLimit([1, 2, 3, 4, 5], 2, getNameById, (allResults) => {
  console.log("output", allResults); // ["User1", "User2", "User3", "User4", "User5"]
});

// [1, 2, 3, 4, 5] => [[1, 2], [3, 4], [5]]
// Inputs in a single batch can be processed concurrently/parallely,
// and each batch will be processed sequentially.
