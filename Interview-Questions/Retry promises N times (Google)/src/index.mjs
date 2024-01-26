import "./styles.css";

//https://learnersbucket.com/examples/interview/retry-promises-n-number-of-times-in-javascript/"
// https://www.youtube.com/watch?v=9SwDDaxcUV4&t=1s&ab_channel=Learnersbucket

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
Retry promises N number of times in JavaScript. 
retryPromise takes an async function fn, a number 
of retries, and a delay (in milliseconds) between retries. 
It recursively calls the function until either it succeeds 
or runs out of retries 
</div>
<a href="https://learnersbucket.com/examples/interview/retry-promises-n-number-of-times-in-javascript/">Click here for Learner's bucket</a
`;

// using promises
function retry(fn, retries, delay) {
  return new Promise((resolve, reject) => {
    const attempt = (retries) => {
      fn()
        .then(resolve)
        .catch(error => {
          if (retries > 0) {
            console.log(`... retries left: ${retries}`);
            setTimeout(() => attempt(retries-1), delay);
          } else {
            reject(error);
          }
        });
    };

    attempt(retries);
  });
}


// using async and await 

// async function retry(fn, retries, delay) {
//   try {
//     const resp = await fn();
//     return resp;
//   } catch (error) {
//     if (retries > 0) {
//       console.log(`... retries left: ${retries}`);
//       setTimeout(() => { }, delay);
//       return retry(fn, retries - 1, delay);
//     } else {
//       throw error;
//     }
//   }
// }


async function exampleAsyncFn() {
  const randomNum = Math.random();
  console.log(randomNum);
  if (randomNum < 0.8) {
    throw new Error('Failed');
  }
  return 'Success';
}

retry(exampleAsyncFn, 4, 300)
  .then((val) => console.log(val))
  .catch((err) => console.log(err))