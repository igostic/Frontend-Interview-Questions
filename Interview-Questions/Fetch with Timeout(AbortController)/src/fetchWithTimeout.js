import "./styles.css";

// reference links
// https://dev.to/rashidshamloo/adding-timeout-and-multiple-abort-signals-to-fetch-typescriptreact-33bb#using-abortcontroller-timeout
// https://dmitripavlutin.com/timeout-fetch-request/#:~:text=fetchWithTimeout()%20(instead%20of%20simple,a%20timeout%20error%20is%20thrown.
// https://developer.mozilla.org/en-US/docs/Web/API/AbortController
// https://medium.com/codex/resilient-fetch-requests-in-javascript-with-abortcontroller-a-guide-with-react-examples-573dba8a3758
const fetchWithTimeout = (url, duration) => {
  return new Promise((resolve, reject) => {
    // Create an AbortController and
    // get its associated signal
    const controller = new AbortController();
    const signal = controller.signal;

    // Initialize a variable to hold
    // the timer ID
    let timerId = null;

    // Start the fetch request with
    // the given URL and abort signal
    fetch(url, { signal })
      .then((resp) => {
        // Once the response is received,
        // attempt to parse it as JSON
        resp
          .json()
          .then((data) => {
            // If successful, clear the timeout and
            // resolve the promise with the parsed data
            clearTimeout(timerId);
            resolve(data);
          })
          .catch((error) => {
            // If parsing fails, reject the
            // promise with the parsing error
            reject(error);
          });
      })
      .catch((error) => {
        // If the fetch itself fails (e.g., network error),
        // reject the promise with the fetch error
        reject(error);
      });

    // Set a timeout to abort the request if it takes
    // longer than the specified duration
    timerId = setTimeout(() => {
      console.log("Aborted");
      controller.abort();
    }, duration);
  });
};

// Example usage
fetchWithTimeout("https://jsonplaceholder.typicode.com/todos/1", 100)
  .then((resp) => {
    // If the fetch succeeds and
    // parsing is successful,
    // this block will execute
    console.log(resp);
  })
  .catch((error) => {
    // If there are any errors
    // (fetch failure, parsing
    // error, or timeout), this
    // block will execute
    console.error(error);
  });
