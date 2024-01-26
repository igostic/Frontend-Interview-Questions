const onClick = () => {
  console.log("Clicked");
};

// count based implementation
function throttleCount(fn, count) {
  let counter = 0;

  return function (...args) {
    // If counter is not matching 
    // the given argument count, 
    // return without executing
    if (++counter !== count) return;

    // Otherwise, reset the counter 
    // for the next time
    counter = 0;

    // Invoke inp fn by setting
    // the context and args
    fn(...args);
  };
}

// throttleCount function for 
// count should be called once 
// for every 4 clicks
let throttleCount1 = throttleCount(onClick, 4);

// classic works as leading
function throttleTime(fn, delay) {
  let lastTimerid;
  let lastRan;

  return function (...args) {
    const context = this;

    // Check if it's the initial run
    if (!lastRan) {
      fn(...args);

      // Update the last ran with the current date
      lastRan = Date.now();
    } else {
      clearTimeout(lastTimerid);
      lastTimerid = setTimeout(() => {
        // The definition of throttle: 
        // the time gap between the last time
        // func executed with the current time,
        //  and if it's true, then execute it
        if (Date.now() - lastRan >= delay) {
          fn(...args);
          lastRan = Date.now();
        }
      }, delay - (Date.now() - lastRan));
    }
  };
}

// const throttledTime1 = throttleTime(onClick, 2000);

// In the above implementation, the first call happens immediately.
// If I want to provide an option to leading and trailing:
// Leading works the same way as the above implementation.
// Trailing works in such a way that the first invocation
// happens after a delay.
// Default option value works as the previous implementation
// only if { leading: false, trailing: true } then only
// trailing will execute, i.e., the first call post delay
function throttleTimeOption(fn, delay, option = { leading: true, trailing: true }) {
  let lastTimerid;
  let lastArgs;

  return function (...args) {
    const { leading, trailing } = option;

    // Wait function for trailing case
    const waitFn = () => {
      if (trailing && lastArgs) {
        fn(...lastArgs);
        lastArgs = null;
        lastTimerid = setTimeout(waitFn, delay);
      } else {
        lastTimerid = null;
      }
    };

    if (!lastTimerid && leading) {
      fn(...args);
    } else {
      lastArgs = args;
    }

    if (!lastTimerid) {
      lastTimerid = setTimeout(waitFn, delay);
    }
  };
}

const throttledTimeOption = throttleTimeOption(onClick, 2000, {
  leading: false,
  trailing: true
});

document.getElementById("btn").addEventListener("click", throttleCount1);

// These implementations can be helpful in scenarios where
// 1. Working on a stock-broking app where users continuously click on "place an order."
// 2. E-commerce website
// 3. ...etc
