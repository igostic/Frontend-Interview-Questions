import { useCallback } from "react";

const useDebounce = (callback, delay) => {
  const debouncedFn = useCallback(
    (...args) => {
      let timeoutId;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedFn;
};

export default useDebounce;
