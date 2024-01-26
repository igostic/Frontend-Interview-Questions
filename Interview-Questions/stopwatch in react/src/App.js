// https://learnersbucket.com/examples/interview/increment-counter-component-in-react/
// https://www.youtube.com/watch?v=xueLGEE3SgQ&list=PL_KW_uw2ITn84SjTLNQsugTU3hU4_EwLM&index=26&ab_channel=Learnersbucket
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/

import { useRef, useState, useEffect } from "react";

export default function Stopwatch() {
  // Create a reference to persist the timer ID
  const timerIdRef = useRef(0);
  // Create a state variable for the timer count
  const [count, setCount] = useState(0);

  const startHandler = () => {
    if (timerIdRef.current) {
      // If the timer is already running, do nothing
      return;
    }
    // Start the timer by setting an interval to update the count every second
    timerIdRef.current = setInterval(
      () => setCount((prevCount) => prevCount + 1),
      // here we not using something like
      // setCount(count + 1) captures the value of count at the
      // time the setInterval was created, it will always use the
      // initial value of count ie 0 in your case and
      // solution for it is that setState/setCount(method returned
      // by useState)
      // accepts a callback function, and captures the current state
      // value at the time it's executed, rather than relying on the
      // value at the time the setInterval was created.
      1000
    );
  };

  const stopHandler = () => {
    clearInterval(timerIdRef.current); // Clear the interval to stop the timer
    timerIdRef.current = 0; // Reset the timer ID
  };

  const resetTimer = () => {
    // Stop the timer and reset the count
    clearInterval(timerIdRef.current);
    timerIdRef.current = 0;
    setCount(0);
  };

  useEffect(() => {
    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(timerIdRef.current);
  }, []); // Empty dependency array ensures this effect runs only on component mount

  return (
    <div>
      <div className="timer">Timer: {count}s</div>
      <div>
        <button onClick={startHandler}>Start</button>
        <button onClick={stopHandler}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
