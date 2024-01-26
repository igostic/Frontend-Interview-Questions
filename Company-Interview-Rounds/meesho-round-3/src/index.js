// Performance optimization questions

// Promise.all([p1, p2]).then(res => {
//
// }).catch(err => {
//
// })
//

// Promise.prototype.myAll = function(arr) {

//   return new Promise((resolve, reject) => {

//     const result = [];
//     let fulfilledCount = 0;

//     if (!arr.length) return resolve(result);

//     arr.forEach((pr, index) => {

//       if (pr instanceof Promise) {
//         pr.then(res => {
//           result[index] = res;
//           fulfilledCount++;

//           if (fulfilledCount === arr.length) {
//             resolve(result);
//           }
//         }).catch(err => {
//           reject(err);
//         })
//       } else {
//         result[index] = pr;
//         fulfilledCount++;
//       }
//     });

//   })

// }

// const debouncedFn = debounce(fn, delay);
// debouncedFn(...args);

// function debounce(fn, delay) {

//   let timeout;

//   return function(...args) {

//     clearTimeout(timeout);

//     timeout = setTimeout(() => {
//       fn.apply(this, args);
//     }, delay);

//   }

// }

const arr = [0, 1, 2, 0, 1, 2, 2];
// -> [0,0,1,1,2,2,2]

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function swapSort(arr) {
  let p1 = 0,
    p2 = arr.length - 1,
    curr = 0;

  // [0, 1, 2, 0, 1, 2, 2]
  while (curr <= p2) {
    if (arr[curr] === 0) {
      swap(arr, p1, curr);

      p1++;
      curr++;
    } else if (arr[curr] === 2) {
      swap(arr, p2, curr);

      p2--;
    } else curr++;
  }

  console.log(arr);
}

swapSort(arr);
