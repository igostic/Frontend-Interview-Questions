function deepCopy(input) {
  // var res = Array.isArray(input) ? [] : {};
  var res = {};
  if (typeof input !== "object") {
    return input;
  }
  for (let key in input) {
    res[key] = deepCopy(input[key]);
  }
  return res;
}

let obj1 = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
};
console.log("obj1-->>", obj1);
// let obj2 = Object.assign({}, obj1)
let obj2 = deepCopy(obj1);

obj1.b.c = 4;
console.log(obj2);
