import React, { useState, useCallback } from "react";
import { Hello } from "./components/Hello";
import { Square } from "./components/Square";
import useCustomCallback from "./hooks/useCustomCallback";

const App = () => {
  const [count, setCount] = useState(0);
  const favoriteNums = [7, 21, 37];

  const increment = useCustomCallback(
    (n) => {
      console.log("n -->>", n);
      setCount((c) => c + n);
    },
    [setCount]
  );
  // const increment = (n) => {
  //   setCount((c) => c + n);
  // };

  return (
    <div>
      <Hello increment={increment} />
      <div>count: {count}</div>
      {favoriteNums.map((n) => {
        return <Square increment={increment} n={n} key={n} />;
      })}
    </div>
  );
};

export default App;
