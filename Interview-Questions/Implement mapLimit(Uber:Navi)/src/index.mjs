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

function getNameById(id, callback) {
  // simulating async request
  const randomRequestTime = Math.floor(Math.random() * 100) + 200;

  setTimeout(() => {
    callback("User" + id);
  }, randomRequestTime);
}

const chop = (inp, limit) => {
  let i = 0;
  let result = [];
  while (i < inp.length) {
    result.push(inp.slice(i, i + limit));
    i += limit;
  }
  console.log("res-->>", result);
  return result;
};
function mapLimit(inputs, limit, iterateeFn, callback) {
  let chopped = chop(inputs, limit);
  console.log(chopped);
  let finalRes = chopped.reduce((prev, curr) => {
    return prev.then((val) => {
      return new Promise((resolve, reject) => {
        let temp = [];
        // let completed = 0;
        curr.forEach((e) => {
          iterateeFn(e, (res) => {
            // if(error) {
            //   reject(error);
            // } else{
            temp.push(res);
            // completed++;
            // if(completed >= curr.length){
            if (temp.length >= curr.length) {
              resolve([...val, ...temp]);
            }
            // }
          });
        });
      });
    });
  }, Promise.resolve([]));

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
