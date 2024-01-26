import { useEffect, useRef } from "react";

// const areEqual = (prevDeps, nextDeps) => {
//   if (prevDeps === null) return false;
//   if (prevDeps.length !== nextDeps.length) return false;
//   for (let i = 0; i < prevDeps.length; i++) {
//     if (!Object.is(prevDeps[i], nextDeps[i])) return false;
//   }
//   return true;
// };
const areEqual = (prevDeps, nextDeps) => {
  // console.log({ prevDeps, nextDeps });
  if (prevDeps === null) return false;
  if (prevDeps.length !== nextDeps.length) return false;
  for (let i = 0; i < prevDeps.length; i++) {
    if (prevDeps[i] !== nextDeps[i]) return false;
  }
  return true;
};
const useCustomCallback = (fn, deps) => {
  // create a ref to store the memoized function
  const memoizedRef = useRef();

  // check if the function or dependencies have changed
  if (!memoizedRef.current || !areEqual(memoizedRef.current.deps, deps)) {
    // console.log("-->>", memoizedRef.current, deps);
    // update the ref with the
    // new function and dependencies
    memoizedRef.current = {
      fn,
      deps
    };
  }

  // cleanup
  useEffect(() => {
    return () => (memoizedRef.current = null);
  }, []);
  // return the memoized function
  return memoizedRef.current.fn;
};

export default useCustomCallback;
