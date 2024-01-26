// https://learnersbucket.com/examples/interview/create-a-toggle-function-in-javascript/

// https://www.youtube.com/watch?v=PacCqVMiS6Y&list=PL_KW_uw2ITn84SjTLNQsugTU3hU4_EwLM&index=37&ab_channel=Learnersbucket


// Create a toggle function in JavaScript that accepts a list of arguments and toggles each of them when invoked in a cycle.

// Example
// let hello = toggle("hello");
// hello() // "hello";
// hello() // "hello";

// let onOff = toggle("on", "off");
// onOff() // "on"
// onOff() // "off"
// onOff() // "on"

function toggle(...args) {
  let index = 0;
  return function(){
    if(args.length){
      console.log(args[index++]);
    }
    if(index >= args.length)
      index = 0;

    // or
    // if(args.length){
    //   console.log(args[index]);
    //   index = (index + 1) % args.length; // Use modulo to wrap around
    // }
  }
}

let hello = toggle("hello");
hello() // "hello";
hello() // "hello";

let onOff = toggle("on", "off");
onOff() // "on"
onOff() // "off"
onOff() // "on"