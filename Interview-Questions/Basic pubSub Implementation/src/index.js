// Library: myPubSub
// subs = {
// 'add': [callback1, callback2, callback3];
// 'add1': []
// }

function Pubsub() {
  this.subs = {
    // 'add':[callback1]
  };
}
Pubsub.prototype.subscribe = function (event, callback) {
  // if current event exist on subs then just push
  if (this.subs[event]) {
    this.subs[event].push(callback);
  } else {
    // if not then create a new key and an array with given callback
    this.subs[event] = [callback];
  }
  const that = this;
  return function unsubscribe() {
    // first find the callback func that was added in the subs
    const funcs = that.subs[event];
    // now find the index of the callback in that function
    const idx = funcs.indexOf(callback);
    if (idx > -1) {
      funcs.splice(idx, 1);
    }
  };
};

Pubsub.prototype.publish = function (event) {
  let funcs = this.subs[event];
  if (funcs) {
    funcs.forEach((element) => {
      element();
    });
  } else {
    // any error
  }
};
let myPubsub = new Pubsub();

let callback1 = function () {
  console.log("Callback 1 executed");
};

let callback2 = function () {
  console.log("Callback 2 executed");
};

let callback3 = function () {
  console.log("Callback 3 executed");
};

let callback4 = function () {
  console.log("Callback 4 executed");
};
const sub1Off = myPubsub.subscribe("add", callback1);
const sub2Off = myPubsub.subscribe("subtract", callback2);
const sub3Off = myPubsub.subscribe("add", callback3);
const sub4Off = myPubsub.subscribe("add", callback4);
// console.log("myPubsub-->>", myPubsub);
// unsubscribing callback 1 with sub1Off
// sub1Off();
// // publish is executing the callbacks, as callback one is unsubscribed
// // so now only callback 2 and callback 3 will be executed
myPubsub.publish("add");
// // // unsubscribing callback 3 with sub3Off
// sub3Off();
// myPubsub.publish("add");
// sub2Off();
// myPubsub.publish("add");
