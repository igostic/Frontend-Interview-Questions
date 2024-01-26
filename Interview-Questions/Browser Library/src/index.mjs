class BrowserHistory {
  constructor() {
    // Array to store browser history &
    // set current to -1 (no history yet).
    this.history = [];
    this.current = -1;
  }

  load(url) {
    // to handle the overwridden case
    // ie special case mentioned,
    // use it if interviewer says it
    // if (this.current < this.history.length - 1) {
    //   // If the user navigated back and then loads a new URL,
    //   // we need to truncate the forward history.
    // }
    this.history.push(url); // Add the new URL to history.
    this.current++; // Move the current position forward.
    // console.log("load this.history-->>", this.history, " && -- this.current ---", this.current)
    return url; // Return the loaded URL.
  }

  back() {
    if (this.current > 0) {
      // console.log("this.current-->>", this.current, this.history);
      // If there is a previous URL in history, move one step back.
      this.current--;
      // console.log("back if this.history-->>", this.history, " && -- this.current ---", this.current)
      return this.history[this.current]; // Return the previous URL.
    } else {
      // console.log("back else this.history-->>", this.history, " && -- this.current ---", this.current)
      return false; // If there's no previous URL, return false.
    }
  }

  forward() {
    if (this.current < this.history.length - 1) {
      // If there is a forward URL in history, move one step forward.
      this.current++;
      // console.log("forward if this.history-->>", this.history, " && -- this.current ---", this.current)
      return this.history[this.current]; // Return the forward URL.
    } else {
      // console.log("forward else this.history-->>", this.history, " && -- this.current ---", this.current)
      return false; // If there's no forward URL, return false.
    }
  }

  reload() {
    if (this.current >= 0) {
      // console.log("this.history-->>", this.history, " && -- this.current ---", this.current)
      return this.history[this.current]; // If there's a current URL, return it.
    } else {
      // console.log("this.history-->>", this.history, " && -- this.current ---", this.current)
      return false; // If there's no current URL, return false.
    }
  }
}

// class BrowserHistory {
//   constructor() {
//     this.history = [];
//     this.current = -1;
//   }

//   load(url) {
//     this.history.push(url);
//     this.current++;
//     return url;
//   }

//   back() {
//     if (this.current > 0) {
//       this.current--;
//       return this.history[this.current];
//     }
//     return null;
//   }

//   forward() {
//     if (this.current < this.history.length - 1) {
//       this.current++;
//       return this.history[this.current];
//     }
//     return null;
//   }

//   reload() {
//     return this.history[this.current];
//   }
// }

const browser = new BrowserHistory();

console.log(browser.load("a.com")); // a.com
console.log(browser.load("b.com")); // b.com
console.log(browser.load("c.com")); // c.com
console.log(browser.load("d.com")); // d.com
console.log(browser.back()); // c.com
console.log(browser.back()); // b.com
console.log(browser.forward()); // c.com
console.log(browser.forward()); // d.com
console.log(browser.forward()); // false
console.log(browser.back()); // c.com
console.log(browser.back()); // b.com

// // Special case
// console.log(browser.load('e.com')); // e.com
// console.log(browser.load('f.com')); // f.com
// console.log(browser.back());       // e.com
// console.log(browser.back());       // b.com

// Following ordering to work
// load(‘a.com’) -> a.com
// load(‘b.com’) -> b.com
// load(‘c.com’) -> c.com
// load(‘d.com’) -> d.com
// back() -> c.com
// back() -> b.com
// forward() -> c.com
// forward() -> d.com
// forward() -> //return false as there is no history (same for back should also happen)
// back() -> c.com
// back() -> b.com
// Special case (bonus points): Continue from above example
// load(‘e.com’)
// load(‘f.com’)
// back() -> e.com
// back() -> b.com // and not d.com -> history needs to be overridden here

// Current History: [], Current Pointer: -1

// Load 'a.com' -> Current history:
// ['a.com'], Current Pointer: 0

// Load 'b.com' -> Current history:
// ['a.com', 'b.com'], Current Pointer: 1

// Load 'c.com' -> Current history:
// ['a.com', 'b.com', 'c.com'], Current Pointer: 2

// Load 'd.com' -> Current history:
// ['a.com', 'b.com', 'c.com', 'd.com'], Current Pointer: 3

// Go back -> Current URL:
// 'c.com', Current Pointer: 2

// Go back -> Current URL:
// 'b.com', Current Pointer: 1

// Go forward -> Current URL:
// 'c.com', Current Pointer: 2

// Go forward -> Current URL:
// 'd.com', Current Pointer: 3

// Unable to go forward,
// returns false, Current Pointer: 3

// Go back -> Current URL:
// 'c.com', Current Pointer: 2

// Go back -> Current URL:
// 'b.com', Current Pointer: 1

// Load 'e.com' -> Current history:
// ['a.com', 'b.com', 'e.com'], Current Pointer: 2

// Load 'f.com' -> Current history:
// ['a.com', 'b.com', 'e.com', 'f.com'], Current Pointer: 3

// Go back -> Current URL:
// 'e.com', Current Pointer: 2

// Go back -> Current URL:
// 'b.com', Current Pointer: 1
