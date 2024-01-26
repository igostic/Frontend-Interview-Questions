import { useRef } from "react";

const useCustomEffect = (cb, deps) => {
  // First Render

  // using useRef to persist values
  // even if components re-renders

  const isFirstRender = useRef(true);
  // to compare the deps
  const prevDeps = useRef([]);

  if (isFirstRender.current) {
    isFirstRender.current = false;
    // cb();
    // for cleanup function
    let cleanup = cb();
    return () => {
      if (cleanup && typeof cleanup === "function") cleanup();
    };
  }
  // Deps Changes and No Deps Array
  // if deps exist do something, otherwise
  // make it true means in case when
  // no deps provided
  const depsChanged = deps
    ? JSON.stringify(deps) !== JSON.stringify(prevDeps.current)
    : true;
  if (depsChanged) {
    // cb();
    // for cleanup function
    // we are checking for deps because we want
    // to call cleanup when deps changes
    let cleanup = cb();
    if (cleanup && typeof cleanup === "function" && deps) cleanup();
  }

  // assign current deps to prevDeps if there
  // otherwise make assign it empty array
  prevDeps.current = deps || [];
  // Cleanup
  // so for cleanup function to work
  //   we have to receive it from cb()
};

export default useCustomEffect;
