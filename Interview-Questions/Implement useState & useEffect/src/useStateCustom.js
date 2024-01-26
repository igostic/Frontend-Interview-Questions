// watch these videos
// https://www.youtube.com/watch?v=KJP1E-Y-xyo&ab_channel=JSConf
// https://www.youtube.com/watch?v=RnwqU9dqTr4&ab_channel=WEBSTACK

// I will be incrementally implementing the solution

// function useStateCustom(initialValue) {
//   let _val = initialValue;
//   const state = _val;
//   const setState = (newVal) => {
// console.log({ newVal });
//     _val = newVal;
//   };
//   console.log({ _val });
//   return [state, setState];
// }

// const [count, setCount] = useStateCustom(1);
// console.log(count);
// setCount(2);
// console.log(count);

// but unfortunately it's logging only 1 twice
// our setCount working fine, but when we are desctructuring
// count variable is initialised with 1.
// we can quickly solve this by defining state as getter function

function useStateCustom(initialValue) {
  let _val = initialValue;
  const state = () => _val;
  const setState = (newVal) => {
    // console.log({ newVal });
    _val = newVal;
  };
  // console.log({ state });
  return [state, setState];
}

const [count, setCount] = useStateCustom(1);
console.log(count());
setCount(2);
console.log(count());

// this will work perfectly but we want to do more
// and in react we don't use the getter function we just use our variable
// like here count not count().
