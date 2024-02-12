import "./styles.css";

// Implement mapLimit, which is a utility function that produces a list
// of outputs by mapping each input through an asynchronous iteratee
// function. The provided limit dictates how many operations can occur
// at once.

// Inputs
// inputs: An array of inputs.
// limit: The maximum number of operations at any one time.
// iterateeFn: The async function that should be called
// with each input to generate the corresponding output.
// It will have two arguments:
//      input: The input being processed.
//      callback: A function that will be called when the input
// is finished processing. It will be provided one argument,
// the processed output.
// callback: A function that should be called with the array
// of outputs once all the inputs have been processed.

// Simulates an asynchronous request to get a user name by ID
function getNameById(id, callback) {
  // Simulating async request with a random delay
  const randomRequestTime = Math.floor(Math.random() * 100) + 200;

  setTimeout(() => {
    // Callback with the result, "User" concatenated with the provided ID
    callback("User" + id);
  }, randomRequestTime);
}

// Splits an array into batches of a specified limit
const chop = (inp, limit) => {
  let i = 0;
  let result = [];
  while (i < inp.length) {
    // Pushing slices of the input array into the result array
    result.push(inp.slice(i, i + limit));
    i += limit;
  }
  // Logging the sliced arrays (batches) to the console
  console.log("res-->>", result);
  return result;
};

// Main function for mapping inputs with a concurrency limit
function mapLimit(inputs, limit, iterateeFn, callback) {
  // Dividing input array into batches
  let chopped = chop(inputs, limit);

  // Reducing the batches to a promise chain for sequential processing
  let finalRes = chopped.reduce((prev, curr) => {
    return prev.then((val) => {
      return new Promise((resolve, reject) => {
        let temp = [];
        // Iterating through elements in the current batch
        curr.forEach((e) => {
          // Applying the iteratee function asynchronously to each element
          iterateeFn(e, (res) => {
            // Accumulating results in a temporary array
            temp.push(res);
            // Checking if all elements in the batch are processed
            if (temp.length >= curr.length) {
              // Resolving the promise with the combined results
              resolve([...val, ...temp]);
            }
          });
        });
      });
    });
  }, Promise.resolve([]));

  // Handling the final results with the provided callback
  finalRes.then((res) => {
    callback(res);
  });
}
//example:
mapLimit([1, 2, 3, 4, 5], 2, getNameById, (allResults) => {
  console.log("output", allResults); // ["User1", "User2", "User3", "User4", "User5"]
});

// [1, 2, 3, 4, 5] => [[1, 2], [3, 4], [5]]
// inputs in a single batch can be processed concurrently/parallely
// each batch will be processed sequentially
