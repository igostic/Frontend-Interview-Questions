// https://theanubhav.com/2019/02/03/js-currying-in-interview/
function addWithValueOf(x) {
  let sum = x;
  function resultFn(y) {
    sum += y;
    return resultFn;
  }
  resultFn.valueOf = function () {
    return sum;
  };
  return resultFn;
}
console.log(5 + addWithValueOf(2)(3)); //output: 10
console.log(addWithValueOf(2)(3)(4) == 9); //output: true
console.log(addWithValueOf(3)(4)(5).valueOf()); //output: 12
console.log(addWithValueOf(1)(2)(3)(4).valueOf());
// console.log(addWithValueOf(1)(2)(3)(4)(5).valueOf());

function add(x) {
  let sum = x;
  return function resultFn(y) {
    sum += y;
    resultFn.result = sum;
    return resultFn;
  };
}

// const result = add(1)(2)(3)(4);
// console.log(result.result);
// console.log(add(1)(2)(3)(4));
// console.log(add(1)(2)(3)(4)(5));

function sum(...args) {
  function inner(...more) {
    return sum(...args, ...more);
  }
  let total = args.reduce((a, b) => a + b, 0);
  inner.toString = () => total;

  return inner;
}

// console.log(sum(2, 3).toString());
// console.log(sum(1)(2)(2)(3)().toString());
// console.log(sum(1)(2)(3).toString());
// console.log(add1(1)(2)(3)(4)(5)); // 15
// console.log(add1(1)(2)); // 3
