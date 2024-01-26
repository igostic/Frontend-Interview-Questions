let arr = [1, 2, 3];

function double(val) {
  return val * 2;
}
function isOdd(val) {
  return val % 2 !== 0;
}

function sum(val1, val2) {
  return val1 + val2;
}

function greaterThan2(val) {
  return val > 2;
}

Array.prototype.myForEach = function (callback, thisArg) {
  // here this refers to array ie lefthand of dot(.)
  // for (let i = 0; i < this.length; i++) {
  //   callback(this[i], i, this);
  // }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  var array = this;
  thisArg = thisArg || this;
  for (var i = 0, l = array.length; i !== l; ++i) {
    // to use thisArg we need to explicit bind the
    // callback so using .call() method
    callback.call(thisArg, array[i], i, thisArg);
  }
};

arr.myForEach((val) => console.log("forEach--->>>", val * 2));

Array.prototype.myMap = function (callback) {
  // here this refers to arra ielefthand of dot(.)
  let res = [];
  for (let i = 0; i < this.length; i++) {
    res.push(callback(this[i], i, this));
  }
  return res;
};

console.log(arr.myMap(double));

Array.prototype.myFilter = function (callback) {
  // here this refers to arra ielefthand of dot(.)
  let res = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) res.push(this[i]);
  }
};

console.log(arr.filter(isOdd));

Array.prototype.myReduce = function (callback, initValue) {
  // here this refers to arra ielefthand of dot(.)
  let acc = initValue;
  for (let i = 0; i < this.length; i++) {
    if (acc !== undefined) acc = callback(acc, this[i], i, this);
    else acc = this[i]; // first value assigned
  }
  return acc;
};

console.log(arr.myReduce(sum));
Array.prototype.myReduceRight = function (callback, initValue) {
  // here this refers to arra ielefthand of dot(.)
  let acc = initValue;
  for (let i = this.length - 1; i >= 0; i--) {
    if (acc !== undefined) acc = callback(acc, this[i], i, this);
    else acc = this[i]; // first value assigned
  }
  return acc;
};

console.log(arr.myReduceRight(sum));

Array.prototype.myFind = function (callback) {
  // here this refers to arra ielefthand of dot(.)
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) return this[i];
  }
};

console.log(arr.find(greaterThan2));
