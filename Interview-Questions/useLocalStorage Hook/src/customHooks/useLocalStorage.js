// my own implementation

import { useEffect, useState } from "react";

const useLocalStorage = (key, initValue) => {
  // Get data from localStorage on component mount
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initValue;

  // State to keep track of the current value
  const [val, setVal] = useState(initial);

  // Update localStorage and state when the value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(val));
  }, [val]);

  return [val, setVal];
};

export default useLocalStorage;
