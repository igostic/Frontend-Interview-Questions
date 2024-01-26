import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);

  const [id, setId] = useState(null);

  useEffect(() => {
    let intervalId = setInterval(() => {
      if (count === 10) {
        clearInterval(intervalId);
      }
      //console.log(count);
      setCount((count) => count + 1);
    }, 1000);

    // let intervalId1 = setInterval(() => {
    //   //console.log(count);
    //   setCount1((count1) => count1 + 1);
    // }, 500);
    // console.log("--", intervalId);
    setId(intervalId);
    return () => clearInterval(intervalId);
  }, []);
  if (count === 10) {
    clearInterval(id);
  }
  return (
    <div className="App">
      <div>Count: {count} </div>
      <div>Count1: {count1} </div>
    </div>
  );
}

/* (function(){
setTimeout(()=> console.log(1),2000);
console.log(2);
setTimeout(()=> console.log(3),1000);
console.log(4);
})(); */

/* (async function(){
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(1);
  console.log(2);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(3);
  console.log(4);
})(); */

// 2 4 3 1

// function add(a) {
//   return (b) => {
//     return (c) => {
//       return a + b + c;
//     };
//   };
// }

// console.log(curried(4)(2)(3)); //9
// console.log(add(4)(2)(3)(1)) // 10
// console.log(add(4)(2)(3)(1)(5)) // 15
// // so on

/* const curry = (fn) => {const curriedFn = (...args) => {
    if(args.length >= fn.length){
      return fn(...args);
    } else{
      return (...moreArgs) => {
        return curriedFn(...args, ...moreArgs);
      }
    }
  };
  return curriedFn;
}

console.log(add(4)(2)(3)(4)); //9 

/* //calculate(10).add(5).multiply(2).val() //30
function name() {
console.log(this);
}

function calculate(intValue) {
  let res = intValue;
  
  const calculator = {
    add: function(val){
      res += val;
      return this;
    },
    multiply: function(val){
      res *= val;
      return this;
    },
    val: function() {
      return res;
    }
  };
  return calculator;
}

let res = calculate(10).add(5).multiply(2).val()
console.log(res); */
// let arr = [3, 1, 4, 3, 5, 2];
// /*
// stack = [1]
// res = [-1, 2, 2, 2, -1, 1] .reverse() =>  */

// function nextSmaller(arr) {
//   let stack = 0;
//   let nextSmaller = [];

//   for (let i = arr.length - 1; i >= 0; i--) {
//     const currElement = arr[i];
//     if (stack === 0) {
//       stack = currElement;
//       nextSmaller[i] = -1;
//     } else if (currElement > stack) {
//       // nextSmaller.push(stack);
//       nextSmaller[i] = stack;
//     } else {
//       stack = currElement;
//       // nextSmaller.push(-1);
//       nextSmaller[i] = -1;
//     }
//   }
//   return nextSmaller;
// }

// console.log(nextSmaller(arr));
