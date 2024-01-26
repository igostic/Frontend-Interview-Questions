// 1. Promise.all
// 2. Promise.race
// 3. Promise.any
// 4. promise.allSettled

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(2), 100);
});
const p3 = 3;
const p4 = 4;

// promise.all;

function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    // to store result
    let result = [];
    let completed = 0;
    promises.forEach((promise, idx) => {
      // Ensure non-Promise values are wrapped
      // in a resolved Promise
      Promise.resolve(promise)
        .then((res) => {
          // console.log("result -->>", result, idx);
          completed++;
          result[idx] = res;
          if (completed === promises.length) {
            resolve(result);
          }
        })
        .catch((err) => reject(err));
      // console.log("idx-->>", idx);
    });
  });
}

// myPromiseAll([p1, p2, p3, p4])
//   .then((res) => console.log("res myPromiseAll-->>", res))
//   .catch((err) => console.log("err myPromiseAll-->>", err));

// // myAllSettled method
function myAllSettled(promises) {
  return new Promise((resolve, reject) => {
    // to store result
    let result = [];
    let completed = 0;
    promises.forEach((promise, idx) => {
      // Ensure non-Promise values are wrapped in a resolved Promise
      Promise.resolve(promise)
        .then((res) => {
          completed++;
          result[idx] = { status: "fulfilled", res };
          if (completed === promises.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          completed++;
          result[idx] = { status: "rejected", err };
          if (completed === promises.length) {
            resolve(result);
          }
        });
    });
  });
}

// myAllSettled([p1, p2, p3, p4])
//   .then((val) => console.log("val myAllSettled-->>", val))
//   .catch((err) => console.log("err myAllSettled-->>", err));

// // myPromiseRace method
function myPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      // Ensure non-Promise values are wrapped in a resolved Promise
      Promise.resolve(promise)
        .then((val) => resolve(val))
        .catch((err) => reject(err));
    });
  });
}
// myPromiseRace([p2, p3])
//   .then((val) => console.log("val myPromiseRace-->>", val))
//   .catch((err) => console.log("err myPromiseRace-->>", err));

function myPromiseAny(promises) {
  return new Promise((resolve, reject) => {
    let errors = [];
    let completed = 0;

    promises.forEach((promise) => {
      // Ensure non-Promise values are wrapped in a resolved Promise
      Promise.resolve(promise)
        .then((value) => {
          resolve(value);
        })
        .catch((error) => {
          errors.push(error);
          completed++;
          if (completed === promises.length) {
            reject(errors);
          }
        });
    });
  });
}

// myPromiseAny([p1, p2, 5, 6])
//   .then((val) => console.log("val myPromiseAny-->>", val))
//   .catch((err) => console.log("err myPromiseAny-->>", err));

myPromiseAny([
  new Promise((res, rej) => {
    rej(new Error("1"), 200);
  }),
  new Promise((res, rej) => {
    rej(new Error("2"), 2);
  }),
  new Promise((res, rej) => {
    rej("3");
  })
])
  .then((val) => console.log("val-->>", val))
  .catch((err) => console.log("err-->>", err));

// const memoize = function (fn) {
//   // caching
//   const cache = {};
//   return function () {
//     const key = JSON.stringify(arguments);
//     // checj if key exist in my object cache or not
//     if (cache[key]) {
//       console.log("Hi there");
//       return cache[key];
//     }
//     cache[key] = fn(...arguments);
//     return cache[key];
//   };
// };

// function factorial(n) {
//   if (n === 0 || n === 1) return 1;
//   return factorial(n - 1) * n;
// }
// const memoizedFunction = memoize(factorial);
// console.log(memoizedFunction(10));
// console.log(memoizedFunction(10));
