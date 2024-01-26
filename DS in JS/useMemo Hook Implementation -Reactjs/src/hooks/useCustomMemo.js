import { useEffect, useRef } from "react";

const areEqual = (prevDeps, nextDeps) => {
  if (prevDeps === null) return false;
  if (prevDeps.length !== nextDeps.length) return false;
  for (let i = 0; i < prevDeps.length; i++) {
    if (prevDeps[i] !== nextDeps[i]) return false;
  }
  return true;
};
const useCustomMemo = (cb, deps) => {
  // variable or state to store cached value
  // wants to persist cached value on re-renders
  const memoizedRef = useRef();
  // change in deps
  if (!memoizedRef.current || !areEqual(memoizedRef.current.deps, deps)) {
    memoizedRef.current = {
      // current value
      value: cb(),
      // previous dependencies for
      // comparisons
      deps
    };
  }
  // cleanup logic
  useEffect(() => {
    return () => (memoizedRef.current = null);
  }, []);
  // return memoized value if any
  return memoizedRef.current.value;
};

export default useCustomMemo;
