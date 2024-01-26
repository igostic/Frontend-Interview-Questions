// Implement currying
// evaluate("sum")(1)(2) => 3
// evaluate("multily")(3)(2) => 6
// evaluate("divide")(4)(2) => 2
// evaluate("substract")(3)(1) => 2

function evaluate(operation) {
  return function (a) {
    return function (b) {
      if (operation === "sum") return a + b;
      else if (operation === "substract") return a - b;
      else if (operation === "multiply") return a * b;
      else if (operation === "divide") return a / b;
    };
  };
}

console.log(evaluate("sum")(1)(2)); // 3
console.log(evaluate("multiply")(3)(2)); // 6
console.log(evaluate("divide")(4)(2)); // 2
console.log(evaluate("substract")(4)(1)); // 3
