const STATE = {
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
  PENDING: "pending"
};

function MyPromise(executor) {
  // Initialize state to 'pending'
  this.state = STATE.PENDING;
  // Initialize value to undefined
  this.value;
  // Array to store success callbacks
  this.successCallbacks = [];
  // Array to store failure callbacks
  this.failedCallbacks = [];

  this.runCallbacks = () => {
    if (this.state === STATE.FULFILLED) {
      this.successCallbacks.forEach((executor) => {
        // Execute success callbacks with stored value
        executor(this.value);
      });
      // Reset success callbacks
      this.successCallbacks = [];
    }

    if (this.state === STATE.REJECTED) {
      this.failedCallbacks.forEach((executor) => {
        // Execute failure callbacks with stored value
        executor(this.value);
      });
      // Reset failure callbacks
      this.failedCallbacks = [];
    }
  };

  this.onResolve = (value) => {
    // Schedule microtask for async execution
    queueMicrotask(() => {
      // Ignore if not in pending state
      if (this.state !== STATE.PENDING) return;
      if (value instanceof MyPromise || value instanceof Promise) {
        // Chain promises
        value.then(this.onResolve, this.onReject);
        return;
      }
      // Store resolved value
      this.value = value;
      // Update state to 'fulfilled'
      this.state = STATE.FULFILLED;
      // Execute callbacks
      this.runCallbacks();
    });
  };

  this.onReject = (value) => {
    queueMicrotask(() => {
      // Schedule microtask for async execution
      if (this.state !== STATE.PENDING) return; // Ignore if not in pending state
      if (this.value instanceof MyPromise || this.value instanceof Promise) {
        this.value.then(this.onResolve, this.onReject); // Chain promises
        return;
      }
      this.value = value; // Store rejected value
      this.state = STATE.REJECTED; // Update state to 'rejected'
      this.runCallbacks(); // Execute callbacks
    });
  };

  // Execute user-provided callback
  executor(this.onResolve, this.onReject);

  this.then = (resolveCb, rejectCb) => {
    return new MyPromise((resolve, reject) => {
      this.successCallbacks.push((result) => {
        if (resolveCb === undefined) {
          resolve(result);
          return;
        }
        try {
          // Execute resolve callback
          resolve(resolveCb(result));
        } catch (err) {
          // Handle errors in resolve callback
          reject(err);
        }
      });

      this.failedCallbacks.push((result) => {
        if (rejectCb === undefined) {
          reject(result);
          return;
        }
        try {
          resolve(rejectCb(result)); // Execute reject callback
        } catch (err) {
          reject(err); // Handle errors in reject callback
        }
      });

      this.runCallbacks(); // Execute callbacks
    });
  };

  this.catch = (rejectCb) => {
    return this.then(undefined, rejectCb); // Shorthand for handling rejections
  };

  this.finally = (executor) => {
    return this.then(
      (value) => {
        executor(value); // Execute 'finally' callback on success
        return value;
      },
      (value) => {
        executor(value); // Execute 'finally' callback on failure
        return value;
      }
    );
  };
}

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("hello2");
  }, 5000);
});

promise
  .then((response) => {
    console.log(response); // Log 'hello2'
    const newRes = response + " world2";
    return newRes;
  })
  .then((result) => {
    console.log(result); // Log 'hello2 world2'
    return new MyPromise((res, rej) => {
      setTimeout(() => {
        res(result + " FrontEnd2");
      }, 3000);
    });
  })
  .then((result) => {
    console.log(result); // Log 'hello2 world2 FrontEnd2'
    return new MyPromise((res, rej) => {
      rej(result); // Reject with 'hello2 world2 FrontEnd2'
    });
  })
  .catch((err) => {
    console.log("Error2 "); // This won't execute in this example
    return err;
  })
  .then((result) => {
    console.log(result); // Log 'hello2 world2 FrontEnd2'
  });
