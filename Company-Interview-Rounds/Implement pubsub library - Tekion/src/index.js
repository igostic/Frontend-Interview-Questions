import "./styles.css";

var arr = [1, 4, 86, 100, -10, 148];
// //.        i j
// // set
var sum = 90;

function pair(arr, sum) {
  let res = [];
  let set = new Set();
  for (let i of arr) {
    if (set.has(sum - i)) {
      res.push(i);
      res.push(sum - i);
    }
    set.add(i);
  }
  console.log(set);
  return res;
}

console.log(pair(arr, sum));

// number -> sqaure root of a number

// 9

// 1---------9
// left = 1
// right = 9
// mid = 5*5 == x
// 5*5 > x - left
// right part

// Library: myPubSub
// subs = {
//   'add': [callback1, callback2, callback3];
//   'add1': []
// }

function PubSub() {
  this.subs = {
    // 'add':[{0,callback1}, {1, callback2}, {2, callback3}]
  };
  // idx: null;
}
PubSub.prototype.subscribe = function (str, callback) {
  let res = [];
  var idx;
  if (str in this.subs) {
    this.subs[str].push(callback);
  } else {
    res.push(callback);
    this.subs[str] = res;
  }
  idx = this.subs[str].length - 1;
  console.log("in subsc = ", idx);
  // unsubscribe
  let that = this;
  return function () {
    // console.log("before delete = ", that.subs)
    console.log("in unsubs ", idx);
    that.subs[str].splice(idx, 1);
    idx--;
    console.log("after delete = ", that.subs);
  };
};

PubSub.prototype.publish = function (str) {
  let arr = this.subs[str];
  if (arr) {
    arr.forEach((element) => {
      element();
    });
  } else {
    // any error
  }
};
let myPubSub = new PubSub();

let callback1 = function () {
  console.log("Callback 1 executed");
};

let callback2 = function () {
  console.log("Callback 2 executed");
};

let callback3 = function () {
  console.log("Callback 3 executed");
};

const sub1Off = myPubSub.subscribe("add", callback1);
const sub2Off = myPubSub.subscribe("add", callback2);
const sub3Off = myPubSub.subscribe("add", callback3);

// myPubSub.publish("add");
sub1Off();
// myPubSub.publish("add");
// sub3Off();
// sub2Off();
myPubSub.publish("add");
