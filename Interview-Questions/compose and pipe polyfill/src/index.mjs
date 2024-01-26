import "./styles.css";

// Composition Polyfill

function addFive(a) {
  return a + 5;
}
function substractTwo(a) {
  return a - 2;
}
function multiplyFour(a) {
  return a * 4;
}

function composeNormal(...fns) {
  let res;
  let len = fns.length;
  return function (...args) {
    for (let i = len - 1; i >= 0; i--) {
      const fn = fns[i];
      res = i === len - 1 ? fn(...args) : fn(res);
    }
    return res;
  };
}
function compose(...functions) {
  return (args) => {
    return functions.reduceRight((arg, fn) => fn(arg), args);
  };
}

function pipe(...functions) {
  return (args) => {
    return functions.reduce((arg, fn) => fn(arg), args);
  };
}

function pipeNormal(...fns) {
  let res;
  let len = fns.length;
  return function (...args) {
    for (let i = 0; i < len; i++) {
      const fn = fns[i];
      res = i === 0 ? fn(...args) : fn(res);
    }
    return res;
  };
}
const evaluateCompose = composeNormal(addFive, substractTwo, multiplyFour);
const evaluatePipe = pipeNormal(addFive, substractTwo, multiplyFour);

console.log("compose--", evaluateCompose(5));
console.log(evaluatePipe(5));
