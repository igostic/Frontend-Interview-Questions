// from online -> https://www.youtube.com/watch?v=5uHikv1oBEI

import { useEffect, useState } from "react";
export function useLocalStorageOnline(key, initialData) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem(key));
    if (existingData) {
      setData(existingData);
    } else {
      localStorage.setItem(key, JSON.stringify(initialData));
    }
  }, []);

  // update localStorage function to update data
  const updateLocalStorage = (newData) => {
    if (typeof newData === "function") {
      localStorage.setItem(key, JSON.stringify(newData(data)));
    } else {
      localStorage.setItem(key, JSON.stringify(newData));
    }
    setData(newData);
  };

  return [data, updateLocalStorage];
}

export default useLocalStorageOnline;
