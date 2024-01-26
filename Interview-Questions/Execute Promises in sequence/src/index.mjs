import "./styles.css";

let arr = [
  function () {
    return new Promise((res) => {
      setTimeout(() => res(10));
    });
  },
  function (params) {
    return new Promise((res) => {
      setTimeout(() => res(20 + params));
    });
  },
  function (params) {
    return new Promise((res) => {
      setTimeout(() => res(30 + params));
    });
  },
];

async function executePromisesIterativelyValue(arr) {
  let res;
  for (let i = 0; i < arr.length; i++) {
    res = await arr[i](res);
  }
  return res;
}
// as async always return a promise
// executePromisesIterativelyArr(arr).then(console.log);
executePromisesIterativelyValue(arr).then(console.log);

// async function executePromisesRecursively(arr, idx, res = [null]) {
//   if (idx === arr.length) return res;

//   res = await arr[idx](res);
//   return executePromisesRecursively(arr, idx + 1, res);
// }

// executePromisesRecursively(arr, 0, null).then(console.log);
