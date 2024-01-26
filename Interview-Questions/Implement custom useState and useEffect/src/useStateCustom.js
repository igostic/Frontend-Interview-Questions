// watch these videos
// https://www.youtube.com/watch?v=KJP1E-Y-xyo&ab_channel=JSConf
// https://www.youtube.com/watch?v=RnwqU9dqTr4&ab_channel=WEBSTACK

// I will be incrementally implementing the solution

// function useStateCustom(initialValue) {
//   let _val = initialValue;
//   let state = initialValue;
//   let setState = (newVal) => {
//     console.log({ newVal });
//     _val = newVal;
//   };
//   console.log({ _val });
//   return [state, setState];
// }

// const [count, setCount] = useStateCustom(1);
// console.log(count);
// setCount(2);
// console.log(count);

// Solution 1

// function useStateCustom(initialValue) {
//   let _val = initialValue;
//   let state = _val;
//   const setState = (newVal) => {
//     console.log({ newVal });
//     _val = newVal;
//     state = newVal; // Update the state variable
//     return state; // Return the updated state
//   };
//   console.log({ _val });
//   return [state, setState];
// }

// const [count, setCount] = useStateCustom(1);
// console.log(count);
// const updatedCount = setCount(2);
// console.log(updatedCount);

// Solution2 => this is the good way

// but unfortunately it's logging only 1 twice
// our setCount working fine, but when we are desctructuring
// count variable is initialised with 1.
// we can quickly solve this by defining state as getter function

// function useStateCustom(initialValue) {
//   let _val = initialValue;
//   const state = () => _val;
//   const setState = (newVal) => {
//     // console.log({ newVal });
//     _val = newVal;
//   };
//   // console.log({ state });
//   return [state, setState];
// }

// const [count, setCount] = useStateCustom(1);
// console.log(count());
// setCount(2);
// console.log(count());

// this will work perfectly but we want to do more
// and in react we don't use the getter function we just use our variable
// like here count not count().

// we will use React module pattern

// step1: creating a react module Pattern and put out custom usestate in it and return an object
// with useStateCustom function and this myReact would be immediately invoked function

// step 3: // Now we need to teach our react clone how to render the Component function
// now will right the render function in component react
// const myReact = (() => {
//   // step 6.5 it's happening because we only have one internal variable
//   // and we keep overwriting that
//   // step 6.5 we need fix it by making room for independently moving variables
//   // step 5 // we will take the scope of _val to the outer function
//   let _val; // hold our state in ie myReact module scope
//   function useStateCustom(initialValue) {
//     // const state = () => _val;
//     // step 5.1 Now we will remove our state function and provide it a value
//     // we will say if _val is present use that or use the initial Value, so for first
//     // time decalring it will use initialValue but for subsequest calls it will use _val;
//     // post making these changes we will see the correct rendering of our count values
//     const state = _val || initialValue;
//     const setState = (newVal) => {
//       // console.log({ newVal });
//       _val = newVal;
//     };
//     // console.log({ state });
//     return [state, setState];
//   }

//   //   // step 3.1 my myRender function will take Component as a param , after Component is just
//   //   // an another function
//   function myRender(Com) {
//     let C = Com();
//     C.render(); // will console log the count for us
//     // step 3.2 will return C to do other stuffs
//     return C;
//   }
//   return {
//     useStateCustom,
//     myRender
//   };
// })();

// step2: we will create a functional component, as hooks should be used inside
// functional componets only
// function Component() {
//   const [count, setCount] = myReact.useStateCustom(1);
//   // step6.1, defining another hook
//   const [word, setWord] = myReact.useStateCustom("custom use state");

//   // normally we would be rendering to the DOM, but here we don't have it
//   // so we will just return an object
//   // in object we will have render method , we will make it arrow function that
//   // will console log the count for us
//   // we will also expose an another method ie click method, this method which just do
//   // setCount and increment the count value, it will act as a button for us
//   return {
//     render: () => {
//       // console.log(count);
//       console.log({ count, word });
//       // console.log(word);
//     },
//     click: () => {
//       setCount(count + 1);
//     },
//     // step 6.2, will expose another method ie type
//     // will will take word as a param
//     type: (word) => {
//       setWord(word);
//     }
//   };
// }

// Step4, Now we will use what ever we have just implemented

// var app = myReact.myRender(Component);
// step 4.1 now we will do app.click
// app.click();
// var app = myReact.myRender(Component);
// step 4.2 we will see that function state is getting printed on console
// so we need to fix
// step6: Now what we are doing it that just calling app.click and our value is increasing
// and render method is printing the value
// let's see it in action by calling it mutliple times
// app.click();
// var app = myReact.myRender(Component);
// app.click();
// var app = myReact.myRender(Component);
// app.click();
// var app = myReact.myRender(Component);

// step 6.3 let's call type method here and comment rest
// app.type("testing custom useState");
// var app = myReact.myRender(Component);

// step 6.4 now we will see one problem
// this the output which we got from by this calling order
// var app = myReact.myRender(Component);
// app.click();
// var app = myReact.myRender(Component);
// app.type("testing custom useState");
// var app = myReact.myRender(Component);
// O/P
// {count: 1, word: "custom use state"}
// {count: 2, word: 2}
// {count: "testing custom useState", word: "testing custom useState"}
// now you can see that
// click is incrementing the count to 2 but also updating the word to 2
// and when we trying to set the word its affecting count and setting
// the same value to it ie we don't have independently moving state,

// step 6.6 we will make it an array
// const myReact = (() => {
//   // step 6.6.1 we will make an array
//   let hooks = [];
//   // step 6.6.2 we need an index to access each hook separately
//   let idx = 0; // initialising the value with 0
//   function useStateCustom(initialValue) {
//     // step 6.6.3, now we have an index, we will set value accordingly
//     const state = hooks[idx] || initialValue;
//     // step 6.6.8 freezing idx
//     let _idx = idx;
//     const setState = (newVal) => {
//       hooks[_idx] = newVal;
//     };
//     // step 6.6.4 we will increment our idx
//     idx++;
//     return [state, setState];
//   }

//   function myRender(Com) {
//     // step 6.6.6 resetting the idx to 0
//     idx = 0;
//     let C = Com();
//     C.render();
//     return C;
//   }
//   return {
//     useStateCustom,
//     myRender
//   };
// })();

// var app = myReact.myRender(Component);
// app.click();
// var app = myReact.myRender(Component);
// app.type("testing custom useState");
// var app = myReact.myRender(Component);

// step 6.6.5, the o/p looks like this
// {count: 1, word: "custom use state"}
// {count: 2, word: "custom use state"}
// {count: "testing custom useState", word: "custom use state"}
// here the output 3 is little weird
// it's setting the value of count to type ie testing custom useState and
// word as custome use state ie default value
// why?????
// because we are not resetting the value of index everything we re-render
// so we need top reset the idx;

// step 6.6.7 post making the changes for idx = 0, we broke everything to get
// something like that
// O/P
// {count: 1, word: "custom use state"}
// {count: 1, word: "custom use state"}
// {count: 1, word: "custom use state"}
// now the output for each render is just the initial values
// why? why is it happening like that?
// because of stale closure as our setState function called asynchronously ie
// after render by that time idx is resetted to 0;
// how to fix it? ==> we can freeze the value

// Now write it in one go ie final implementation

// const myReact = (() => {
//   let hooks = [];
//   let idx = 0;
//   function useStateCustom(initialValue) {
//     const state = hooks[idx] || initialValue;
//     let _idx = idx;
//     const setState = (newVal) => {
//       hooks[_idx] = newVal;
//     };
//     idx++;
//     return [state, setState];
//   }

//   function myRender(Com) {
//     idx = 0;
//     let C = Com();
//     C.render();
//     return C;
//   }
//   return {
//     useStateCustom,
//     myRender
//   };
// })();

// function Component() {
//   const [count, setCount] = myReact.useStateCustom(1);
//   const [word, setWord] = myReact.useStateCustom("custom use state");
//   return {
//     render: () => {
//       console.log({ count, word });
//     },
//     click: () => {
//       setCount(count + 1);
//     },
//     type: (word) => {
//       setWord(word);
//     }
//   };
// }

// var app = myReact.myRender(Component);
// app.click();
// var app = myReact.myRender(Component);
// app.type("testing custom useState");
// var app = myReact.myRender(Component);
// app.click();
// var app = myReact.myRender(Component);
// app.type("Neeraj");
// var app = myReact.myRender(Component);

// O/P sequence of above code is
// {count: 1, word: "custom use state"}
// {count: 2, word: "custom use state"}
// {count: 2, word: "testing custom useState"}
// {count: 3, word: "testing custom useState"}
// {count: 3, word: "Neeraj"}

// Now we will implement  our useEffect

const myReact1 = (() => {
  let hooks = [];
  let idx = 0;
  function useStateCustom(initialValue) {
    const state = hooks[idx] || initialValue;
    let _idx = idx;
    const setState = (newVal) => {
      hooks[_idx] = newVal;
    };
    idx++;
    return [state, setState];
  }
  // uStep 1: declaring a function named useEffect takes a callback(cb) and a dependency array(depArray)
  function useEffectCustom(cb, depArray) {
    // uStep 3.2 // at the very start we need to fetch old dependency array
    const oldDeps = hooks[idx];
    // uStep 3  we want to detect change in dependency array
    // so we just assume that dependency array is always changing
    // so we set hasChanged variable to true by default ie if no dependency provided
    let hasChanged = true;
    // uStep 3.2 the only thing that's tricky is to detect change between two arrays
    //  of items, always of same size
    // so we need to compare the two arrays ie old dependency array and new dependency array
    // and good place to store is hooks array
    // uStep 3.3 that could be undefined, so we have to use it conditionally
    if (oldDeps) {
      // uStep 3.4 we have to do line by line comparison
      // we are using some method which goes through each index of array
      // & if any of them is true then whole thingy is true
      // and for comparison we will use Object.is method instead of ===
      // because
      // 1. NAN === NAN is false but Object.is(NAN, NAN) is true, so if any of dependency
      // becomes NAN, which will never happen though but can't rule it out
      // and React uses it internally
      hasChanged = depArray.some((dep, i) => !Object.is(dep, oldDeps[i]));
    }

    // uStep 2 everytime we re-render by default we call our callback cb()
    // cb();
    // uStep 3.1 we will gaurd calling our callback function, if dependency array
    // has changed, then call the callback cb()
    if (hasChanged) cb();
    // step 3.2.1 Storing depArray in hooks array
    hooks[idx] = depArray;
  }
  function myRender(Com) {
    idx = 0;
    let C = Com();
    C.render();
    return C;
  }
  return {
    useStateCustom,
    useEffectCustom,
    myRender,
  };
})();

// function Component() {
//   const [count, setCount] = myReact.useStateCustom(1);
//   const [word, setWord] = myReact.useStateCustom("custom use state");

//   myReact.useEffectCustom(() => {
//     console.log("hehehe implementing custom useEffect");
//   });
//   return {
//     render: () => {
//       console.log({ count, word });
//     },
//     click: () => {
//       setCount(count + 1);
//     },
//     type: (word) => {
//       setWord(word);
//     }
//   };
// }

// var app = myReact.myRender(Component);
// app.click();
// var app = myReact.myRender(Component);
// app.type("testing custom useState");
// var app = myReact.myRender(Component);

const myReact = (() => {
  let hooks = [];
  let idx = 0;
  function useStateCustom(initValue) {
    const state = hooks[idx] || initValue;
    let _idx = idx;
    const setState = (newVal) => {
      hooks[_idx] = newVal;
    };
    idx++;
    return [state, setState];
  }
  function useEffectCustom(cb, depArray) {
    const oldDeps = hooks[idx];
    let hasChanged = true;
    if (oldDeps) {
      hasChanged = depArray.some((dep, i) => !Object.is(dep, oldDeps[i]));
    }
    if (hasChanged) {
      if (typeof hooks[idx] === "function") {
        hooks[idx](); // Call the previous cleanup function, if available
      }
      const cleanup = cb(); // Run the effect and store the cleanup function
      hooks[idx] = cleanup;
    }
  }

  function myRender(Com) {
    idx = 0;
    let C = Com();
    C.render();
    return C;
  }
  return {
    useStateCustom,
    useEffectCustom,
    myRender,
  };
})();

function Component() {
  const [count, setCount] = myReact.useStateCustom(1);
  const [word, setWord] = myReact.useStateCustom("custom use state");

  myReact.useEffectCustom(() => {
    console.log("hehehe implementing custom useEffect");

    return () => {
      console.log("cleanup");
    };
  }, []);
  return {
    render: () => {
      console.log({ count, word });
    },
    click: () => {
      setCount(count + 1);
    },
    type: (word) => {
      setWord(word);
    },
  };
}
var app = myReact.myRender(Component);
app.click();
var app = myReact.myRender(Component);
app.type("testing custom useState");
var app = myReact.myRender(Component);
// var app = myReact.myRender(Component);
// app.click();
// app.click();
// app.click();
// app.click();
// O/P for above code is working
// {count: 1, word: "custom use state"}
// const app1 = myReact.myRender(Component);
// const app2 = myReact.myRender(Component);

// app1.click();
// app1.click();
// app1.render();
// app2.render();

// Now uStep 4 => we will check and log the output by making changes in the hooks array
// uStep 4.1 => empty dependency array, O/P
// hehehe implementing custom useEffect
// {count: 1, word: "custom use state"}
// {count: 2, word: "custom use state"}
// {count: 2, word: "testing custom useState"}

// uStep 4.1 => count dependency array, O/P
// hehehe implementing custom useEffect
// {count: 1, word: "custom use state"}
// hehehe implementing custom useEffect
// {count: 2, word: "custom use state"}
// {count: 2, word: "testing custom useState"}

// uStep 4.1 => word dependency array, O/P
// hehehe implementing custom useEffect
// {count: 1, word: "custom use state"}
// {count: 2, word: "custom use state"}
// hehehe implementing custom useEffect
// {count: 2, word: "testing custom useState"}

// uStep 4.1 => no dependency passed, O/P
// hehehe implementing custom useEffect
// {count: 1, word: "custom use state"}
// hehehe implementing custom useEffect
// {count: 2, word: "custom use state"}
// hehehe implementing custom useEffect
// {count: 2, word: "testing custom useState"}

// one more implementation which works for all the cases possible
// let React = (function () {
//   let global = {}; // define a global variable where we store information about the component
//   let index = 0; // index to keep track of the component's state
//   function render(Component) {
//     global.Component = Component;
//     const instance = Component(); // get the instance of the component
//     index = 0;
//     instance.render(); // call the component's render function

//     global.instance = instance; // store the component's instance for any future calls of the component's functions
//     return global; // return the global variable
//   }

//   function useState(initialState) {
//     if (!global) {
//       throw new Error("Need a global");
//     }

//     if (!global.hooks) {
//       global.hooks = []; // this array holds the state of the component
//     }

//     const hooks = global.hooks;
//     const currentState = global.hooks[index] || initialState;
//     hooks[index] = currentState; // memoize the state for future access
//     let firstrender = true;

//     const setState = (function () {
//       let currentIndex = index; // copy the index so each useState call will have it's own "closed" value over index (currentIndex)
//       return function (value) {
//         global.hooks[currentIndex] = value;
//         render(global.Component); //re-render the component after state change
//       };
//     })();
//     index = index + 1;
//     return [currentState, setState];
//   }

//   function useEffect(cb, deps) {
//     const hooks = global.hooks;

//     // getting older dependencies from the hooks array since
//     // we are storing dependencies as a sub-array inside the hooks array
//     let oldDeps = hooks[index];

//     // if no dependencies are provided,
//     // the callback function will be called at each re-render
//     let hasChanged = true;

//     if (oldDeps) {
//       // checking if the old dependencies are different from older dependencies
//       hasChanged = deps.some((d, index) => !Object.is(d, oldDeps[index]));
//     }
//     if (hasChanged) cb(); // if dependencies has changed call the callback function.

//     hooks[index] = deps; //store dependencies inside the hooks array as a sub-array
//     index++; // increment index for any other useEffect calls
//   }

//   return { render, useState, useEffect };
// })();

// function Component() {
//   // Component is called at each re-render. index is reset to 0.

//   const [count, setCount] = React.useState(1);
//   // hooks: [0], currentIndex: 0,  Incremented Index: 1

//   const [word, setWord] = React.useState("Hello");
//   // hooks: [0, ''], currentIndex: 1,  Incremented Index: 2

//   const countSetter = () => {
//     setCount(count + 1);
//   };

//   const wordSetter = (word) => {
//     setWord(word);
//   };

//   const render = () => {
//     console.log(`Count is: ${count}, Word is: ${word}`);
//   };

//   React.useEffect(() => {
//     console.log("hookssss!!!!");
//   }, [count, word]);
//   // hooks: [0, '', [0, '']], currentIndex: 2,  Incremented Index: 3

//   React.useEffect(() => {
//     console.log("hooks2!!!!!");
//   }, []);
//   // hooks: [0, '', [0, ''], [] ], currentIndex: 3,  Incremented Index: 4

//   return { render, countSetter, wordSetter };
// }

// const global = React.render(Component); // hooks: [ 0, '', [ 0, '' ], [] ]
// global.instance.countSetter(); // hooks: [ 1, '', [ 1, '' ], [] ]
// global.instance.countSetter(); // hooks: hooks: [ 2, '', [ 2, '' ], [] ]
// global.instance.countSetter(); // hooks: [ 3, '', [ 3, '' ], [] ]
// global.instance.wordSetter("yooo"); // hooks: [ 3, 'yooo', [ 3, 'yooo' ], [] ]
// global.instance.wordSetter("ssup"); // hooks: [ 3, 'yooo', [ 3, 'yooo' ], [] ]
// const app1 = React.render(Component);
// const app2 = React.render(Component);

// // Change state in app1
// app1.instance.countSetter();
// app1.instance.wordSetter("Neeraj");
// Both app1 and app2 will reflect the same state change
// app1.instance.render();
// app2.instance.render();
