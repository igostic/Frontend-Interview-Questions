import "./styles.css";
import { useState, useRef, useEffect } from "react";
export default function App() {
  const [count, setCount] = useState(0);
  // to store the setInterval timerid
  const timerIdRef = useRef(null);
  // Method - 1
  // const onStart = () => {
  //   timerIdRef.current = setInterval(() => {
  //     // setCount(count + 1);
  //     // Update count using the functional form of setCount
  //     // to avoid closure issue
  //     setCount((prevCount) => prevCount + 1); // Method - 1
  //   }, 1000);
  // };

  // const onStop = () => {
  //   clearInterval(timerIdRef.current);
  // };

  // second approach with setTimeout - Method 2
  const [start, setStart] = useState(false);
  useEffect(() => {
    if (start) {
      timerIdRef.current = setTimeout(() => {
        setCount(count + 1);
      }, 1000);
    }

    () => {
      clearTimeout(timerIdRef.current);
    };
  }, [count, start]);

  const onStart = () => {
    setStart(true);
  };

  const onStop = () => {
    clearInterval(timerIdRef.current);
    setStart(false);
  };

  return (
    <div className="box">
      <h1>Count: {count}</h1>
      <button onClick={onStart}>Start</button>
      <button onClick={onStop}>Stop</button>
    </div>
  );
}
