import { useState, useCallback } from "react";

const Toggle = (arr, idx = 0) => {
  const [currIndex, setCurrIndex] = useState(idx);

  const toggle = useCallback(() => {
    return setCurrIndex((prevIdx) =>
      prevIdx >= arr.length - 1 ? 0 : prevIdx + 1
    );
  }, [arr]);

  return [toggle, arr[currIndex]];
};

export default Toggle;
