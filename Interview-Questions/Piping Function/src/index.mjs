// https://learnersbucket.com/examples/interview/piping-function-in-javascript-part-1/

// Given an object which can have a function as a value at a 
// nested level, create a function that will accept arguments 
// as input and pass it through all the functions in the input 
// object and return the computed value.

// Input:
let obj = {
  a : {
    b : (a,b,c) => a+b+c,
    c : (a,b,c) => a+b-c,
  },
  d : (a,b,c) => a-b-c,
  e: 1,
  f: null,
  g: undefined,
  h: [1,2,3]
}

function Fn(obj) {
  return function(...args) {
    for(let key in  obj){
      let val = obj[key];
      if(typeof obj[key] === 'function')
        // If the value is a function, call it 
        // with the provided argument
        obj[key] = val(...args);
        // we are making sure that no null, undefined, 
        // values or array shoudl be there
      else if(val && typeof val === "object" && !Array.isArray(val)) {
        // FN returns us a function, so we have to pass 
        // the args we are receiving back to that function
        Fn(val)(...args);
      }
    }
  }
}
Fn(obj)(1,1,1);
console.log(obj);
// Output:
// {
//   a : {
//     b : 3,
//     c : 1,
//   },
//   d : -1,
//   e: 1,
//   f: null,
//   g: undefined,
//   h: [1,2,3]
// }