import "./styles.css";
import { useState, useRef } from "react";

export default function App() {
  const [time, setTime] = useState(null);
  const [isActive, setIsActive] = useState(false);
  // to store the interval id
  const intervalRef = useRef(null);
  const handleTimer = () => {
    if (isActive) {
      clearInterval(intervalRef.current);
    } else {
      // Calculate the start time based on the current time and elapsed time
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        // Update the time by calculating the difference
        // between current time and start time
        setTime(Date.now() - startTime);
      }, 1000);
    }
    setIsActive(!isActive);
  };
  // 3600000 represents the number of milliseconds in one hour.
  // (1 hour = 60 minutes * 60 seconds * 1000 milliseconds)
  const hours = Math.floor(time / 3600000);
  // 60000 represents the number of milliseconds in one minute.
  // (1 minute = 60 seconds * 1000 milliseconds)
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  const handleReset = () => {
    setTime(null);
    setIsActive(false);
    clearInterval(intervalRef.current);
  };
  return (
    <>
      <div className="App">
        <h1>StopWatch</h1>
        <h1>
          {hours}:{minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </h1>
        <div>
          <button onClick={handleTimer}>{isActive ? "Stop" : "Start"}</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </>
  );
}

// if custom hook is required
/*

import "./styles.css";
import useStopwatch from "./customHooks/useStopwatch";

export default function App() {
  const {
    hours,
    minutes,
    seconds,
    isActive,
    handleTimer,
    handleReset
  } = useStopwatch();

  return (
    <>
      <div className="App">
        <h1>StopWatch</h1>
        <h1>
          {hours}:{minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </h1>
        <div>
          <button onClick={handleTimer}>{isActive ? "Stop" : "Start"}</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </>
  );
}

*/
