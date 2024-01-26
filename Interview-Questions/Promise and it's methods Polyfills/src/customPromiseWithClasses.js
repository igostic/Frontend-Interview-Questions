// enums
const STATE = {
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
  PENDING: "pending"
};
class myPromise {
  constructor(executorFn) {
    // Initialize the state as pending, and set up public fields.
    // The initial state of the promise.
    this.state = STATE.PENDING;
    // The value of the promise when resolved.
    this.value = null;
    // Array to store success callbacks.
    this.successCallbacks = [];
    // Array to store failure callbacks.
    this.failedCallbacks = [];

    try {
      // Call the executor function with resolve
      // and reject functions as arguments.
      executorFn(
        // If successful, call this.resolve with the value.
        (value) => this.resolve(value),
        // If there's an error, call this.reject with the value.
        (value) => this.reject(value)
      );
    } catch (error) {
      // If an error is thrown during execution, catch it here.
      // Reject the promise with the caught error.
      this.reject(error);
    }
  }

  resolve(value) {
    // Set the state of the promise to 'fulfilled'.
    this.state = STATE.FULFILLED;
    // Save the resolved value.
    this.value = value;
    // Execute all the registered success callbacks.
    this.successCallbacks.forEach((cb) => cb());
  }

  reject(value) {
    // Set the state of the promise to 'rejected'.
    this.state = STATE.REJECTED;
    // Save the reason for rejection.
    this.value = value;
    // Execute all the registered failure callbacks.
    this.failedCallbacks.forEach((cb) => cb());
  }

  // both are optional params ie
  // onResolve(callback), onReject can be null
  then(onResolve, onReject) {
    return new myPromise((resolve, reject) => {
      // using arrow function because we want
      // to reference this context
      const successCaller = () => {
        // If onResolve is not provided,
        // resolve with the current value.
        if (!onResolve) return resolve(this.value);

        try {
          // Call onResolve with the current value.
          let val = onResolve(this.value);
          resolve(val);
        } catch (error) {
          reject(error);
        }
      };
      const failedCaller = () => {
        if (!onReject) return reject(this.value);

        try {
          let val = onReject(this.value);
          resolve(val);
        } catch (error) {
          reject(error);
        }
      };

      switch (this.state) {
        case STATE.PENDING:
          this.successCallbacks.push(successCaller);
          this.failedCallbacks.push(failedCaller);
          break;
        case STATE.FULFILLED:
          successCaller();
          break;
        case STATE.REJECTED:
          failedCaller();
          break;
        default:
          throw new Error("State is invalid");
      }
    });
  }

  catch(onReject) {
    // first argument is null as we
    // are not resolving anything
    return this.then(null, onReject);
  }

  static resolve(result) {
    return new myPromise((resolve) => {
      resolve(result);
    });
  }

  static reject(result) {
    return new myPromise((_, reject) => {
      reject(result);
    });
  }
}

const promise1 = new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("hello");
  }, 1000);
});

promise1
  .then((response) => {
    console.log("first then-->>", response);
    const newRes = response + " world";
    return newRes;
  })
  .then((result) => {
    console.log("second then-->>", result);
    throw new Error("rejected");
  })
  .catch((err) => console.log(err));
