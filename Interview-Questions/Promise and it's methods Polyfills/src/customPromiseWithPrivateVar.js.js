// // https://www.linkedin.com/pulse/custom-promise-implementationpromise-polyfill-sai-teja/?utm_source=share&utm_medium=member_ios&utm_campaign=share_via
const STATE = {
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
  PENDING: "pending"
};

class MyPromise {
  // Initialize the state as pending, and set up private fields.
  state = STATE.PENDING;
  #value;
  #successCallbacks = [];
  #failedCallbacks = [];

  // Constructor takes a callback function with resolve and reject functions.
  constructor(cb) {
    cb(this.#onResolve, this.#onReject);
  }

  // Utility function to execute the appropriate callbacks based on state.
  #runCallbacks = () => {
    // If state is fulfilled, execute success callbacks.
    if (this.state === STATE.FULFILLED) {
      this.#successCallbacks.forEach((cb) => {
        cb(this.#value);
      });
      this.#successCallbacks = [];
    }

    // If state is rejected, execute failure callbacks.
    if (this.state === STATE.REJECTED) {
      this.#failedCallbacks.forEach((cb) => {
        cb(this.#value);
      });
      this.#failedCallbacks = [];
    }
  };

  // Handler for resolving a promise.
  #onResolve = (value) => {
    queueMicrotask(() => {
      if (this.state !== STATE.PENDING) return;

      // Handle nested promises.
      if (value instanceof MyPromise || value instanceof Promise) {
        value.then(this.#onResolve, this.#onReject);
        return;
      }

      this.#value = value;
      this.state = STATE.FULFILLED;
      this.#runCallbacks();
    });
  };

  // Handler for rejecting a promise.
  #onReject = (value) => {
    queueMicrotask(() => {
      if (this.state !== STATE.PENDING) return;

      // Handle nested promises.
      if (this.#value instanceof MyPromise || this.#value instanceof Promise) {
        this.#value.then(this.#onResolve, this.#onReject);
        return;
      }

      this.#value = value;
      this.state = STATE.REJECTED;
      this.#runCallbacks();
    });
  };

  // Method for adding success and failure callbacks.
  then = (resolveCb, rejectCb) => {
    return new MyPromise((resolve, reject) => {
      this.#successCallbacks.push((result) => {
        if (resolveCb === undefined) {
          resolve(result);
          return;
        }
        try {
          resolve(resolveCb(result));
        } catch (err) {
          reject(err);
        }
      });

      this.#failedCallbacks.push((result) => {
        if (rejectCb === undefined) {
          reject(result);
          return;
        }
        try {
          resolve(rejectCb(result));
        } catch (err) {
          reject(err);
        }
      });

      this.#runCallbacks();
    });
  };

  // Method for handling rejections.
  catch = (rejectCb) => {
    return this.then(undefined, rejectCb);
  };

  // Method for running a callback after a promise has settled.
  finally = (cb) => {
    return this.then(
      (value) => {
        cb(value);
        return value;
      },
      (value) => {
        cb(value);
        return value;
      }
    );
  };

  // Static method to create a resolved promise.
  static resolve(result) {
    return new MyPromise((resolve) => {
      resolve(result);
    });
  }

  // Static method to create a rejected promise.
  static reject(result) {
    return new MyPromise((_, reject) => {
      reject(result);
    });
  }
}

const promise1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("hello");
  }, 5000);
});

promise1
  .then((response) => {
    console.log(response);
    const newRes = response + " world";
    return newRes;
  })
  .then((result) => {
    console.log(result);
    return new MyPromise((res, rej) => {
      setTimeout(() => {
        res(result + " FrontEnd");
      }, 3000);
    });
  })
  .then((result) => {
    console.log(result);
    return new MyPromise((res, rej) => {
      rej(result);
    });
  })
  .catch((err) => {
    console.log("Error ");
    return err;
  })
  .then((result) => {
    console.log(result);
  });
