// https://dev.to/vijayprwyd/polyfill-for-promises-1f0e
// only to handle single then
function MyPromise(executor) {
  let onResolve,
    onReject,
    isFulFilled = false,
    isRejected = false,
    isCalled = false,
    value,
    error;
  function resolve(val) {
    isFulFilled = true;
    value = val;
    if (typeof onResolve === "function" && !isCalled) {
      isCalled = true;
      onResolve(val);
    }
  }

  function reject(err) {
    isRejected = true;
    error = err;
    if (typeof onResolve === "function" && !isCalled) {
      isCalled = true;
      onReject(val);
    }
  }

  this.then = function (callback) {
    onResolve = callback;
    if (!isCalled && isFulFilled) {
      isCalled = true;
      onResolve(value);
    }
    return this;
  };

  this.catch = function (callback) {
    onReject = callback;
    if (!isCalled && isRejected) {
      isCalled = true;
      onReject(error);
    }
    return this;
  };

  executor(resolve, reject);
}

MyPromise.resolve = (val) => {
  return new MyPromise(function executor(resolve, reject) {
    resolve(val);
  });
};
MyPromise.reject = (val) => {
  return new MyPromise(function executor(resolve, reject) {
    reject(val);
  });
};

const expPromise = new MyPromise((resolve, reject) => {
  resolve("hi");
  setTimeout(() => {
    resolve("Hehe I'm resolved!");
  }, 1000);
  // resolve("Hehe I'm resolved!");

  // reject("sad");
});

expPromise
  .then((res) => {
    console.log(res);
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));

// const REJECTED = 2;
// const PENDING = 0;
// const FULFILLED = 1;

// function CustomPromise(executor) {
//   let state = PENDING;
//   let val = null;
//   let handlers = [];
//   let catches = [];

//   function resolve(value) {
//     if (state !== PENDING) return;
//     state = FULFILLED;
//     val = value;
//     handlers.forEach((h) => h(val));
//   }

//   function reject(error) {
//     if (state !== PENDING) return;
//     state = REJECTED;
//     val = error;
//     catches.forEach((c) => c(val));
//   }

//   this.then = (callback) => {
//     if (state === FULFILLED) callback(val);
//     else {
//       handlers.push(callback);
//     }
//     return this;
//   };

//   this.catch = (callback) => {
//     if (state === REJECTED) callback(val);
//     else {
//       catches.push(callback);
//     }
//     return this;
//   };

//   executor(resolve, reject);
// }

// const expPromise = new CustomPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("Hehe I'm resolved!");
//   }, 1000);
//   // reject("sad");
// });

// expPromise
//   .then((res) => {
//     console.log(res);
//     return "value";
//   })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => console.log(err));
