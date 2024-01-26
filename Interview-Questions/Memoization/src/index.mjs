function add(num1, num2) {
  return num1 + num2;
}
function multiply(num1, num2, num3) {
  return num1 * num2 * num3;
}
// console.log(add(10,20))
// console.log(add(10,20))
// console.log(add(10,20))

const memoization = (fn) => {
  let cache = {};
  return (...args) => {
    let key = JSON.stringify(args);
    console.log("key --->>>", key);
    if (cache[key]) {
      console.log("returned from cache", cache[key]);
      return cache[key];
    }

    // calculate func result
    let res = fn(...args);
    cache[key] = res;
    return res;
  };
};

let memoiseAdd = memoization(add);
// let memoiseMultiply = memoization(multiply);

console.log(memoiseAdd(10, 20));
console.log(memoiseAdd(10, 20));
console.log(memoiseAdd(10, 20));

// console.log(memoiseMultiply(10,20,30));
// console.log(memoiseMultiply(10,20,30));
