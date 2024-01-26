import "./styles.css";

// Q1: Variables and constants:

const x = { a: 1, b: 2 };
x.a = 5;
console.log(x); // {a: 5, b: 2}

// const a = 7;
// a = 8;
// —-----
// let x = {a: 1, b: 2};
// let y = x;

// x.a = 5;
// console.log(x);
// console.log(y);

// // —----
// object [ { } [] function() {} ] > heap |
// Const X: [ add{} ] < stack
// X = {a:2, b:2}

// Q2: Closures.
function counter() {
  let count = 0; // Initialize a count variable

  return function () {
    count++; // Increment the count each time the inner function is called
    console.log(count); // Log the updated count
  };
}
let counter1 = counter();
counter1(); // 1
counter1(); // 2

let counter2 = counter();
counter2(); // 1
counter1(); // 3

// Q3:

function task() {
  setInterval(() => {
    console.log("task done");
  }, 0);
}
task();

// Q4: Stop Watch
function Timer(callback, I, prevTime) {
  this.id = null;
  this.start = () => {
    if (this.id !== null) {
      return;
    }

    const intervalCall = (interval) => {
      const Interval = Math.abs(interval - Date.now());
      const extraTime = Interval - I;
      if (extraTime !== 0) {
        interval = I - extraTime;
      }
      this.id = setTimeout(() => {
        callback(Date.now());
        intervalCall(Date.now());
      }, interval);
    };

    intervalCall(prevTime);
  };

  this.stop = () => {
    clearTimeout(this.id);
  };
}

const t = new Timer(
  (currentTime) => {
    console.log(currentTime);
  },
  1000,
  Date.now()
);

t.start();
// —---
// t.start() will start the timer. It will log the current time every second.
// For example: 1631694424000 (timestamp format)
// t.stop() will stop the timer.

// Q4 Bonus:
function AccurateTimer(callback, interval) {
  this.id = null;
  this.flag = true;
  this.start = () => {
    if (this.id !== null) {
      return;
    }
    const time = Date.now();
    while (this.flag) {
      if (time + interval - Date.now() <= 0) {
        callback();
        time = Date.now();
      }
    }
  };

  this.stop = () => {
    this.flag = false;
  };
}

const t1 = new Timer((currentTime) => {
  console.log(currentTime);
}, 1000);

t1.start();
t1.stop();
