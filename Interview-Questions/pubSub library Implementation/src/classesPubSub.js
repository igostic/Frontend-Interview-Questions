/**
 * Pubsub.js
 *
 * A class that implements a publish (or 'emit') and subcribe logic.
 *
 * Instance Methods
 * - subscribe(eventName, func) -> subscribe a function to trigger when a specific event
 * is published. This returns an object with methdod "unsubscribe()" that allows us to
 * remove func from being triggered when the evt is published.
 *
 * - publish(eventName, ...args) ->  Publishes evt, and calls all functions associated with
 * the evt. Additionally, it passes all arguments supplied to publish into the functions
 * that are triggered.
 */

class Pubsub {
  constructor() {
    this.subs = {
      // key: eventname, value: [ funcs ]
    };
  }

  subcribe(event, callback) {
    if (this.subs[event]) {
      this.subs[event].push(callback);
    } else {
      this.subs[event] = [callback];
    }
    return {
      unsubscribe: () => {
        const funcs = this.subs[event];
        const idx = funcs.indexOf(callback);
        if (idx > -1) {
          funcs.splice(idx, 1);
        }
      }
    };
  }

  publish(event, ...args) {
    const funcs = this.subs[event];
    if (Array.isArray(funcs)) {
      funcs.forEach((func) => {
        // func.apply(null, args);
        func(...args);
      });
    }
  }
}

const plusOne = (x) => {
  console.log("plusOne", x + 1);
};
const logThree = (x, y, z) => {
  console.log("logThree", x, y, z);
};

const pubsub = new Pubsub();

const foo = pubsub.subcribe("fun", plusOne);
const bar = pubsub.subcribe("fun", logThree);

const baz = pubsub.subcribe("lame", plusOne);

pubsub.publish("fun", 1, 2, 3); // calls plusOne & logThree
pubsub.publish("lame", 4); // calls plusOne

foo.unsubscribe(); // removes plusOne from "fun"

pubsub.publish("fun", 5, 6); // calls logThree
