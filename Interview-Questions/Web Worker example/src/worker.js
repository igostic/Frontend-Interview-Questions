// self in JavaScript refers to
// the global object in a given
// context. In a web worker,
//self refers to the worker
//itself. It's similar to
//how window refers to
//the global object
//in the main thread.

self.onmessage = function (msg) {
  console.log(msg);
  let sum = 0;
  for (let i = 0; i < 10000; i++) {
    sum += i;
  }
  alert("Sum is " + sum);
};
