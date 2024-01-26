import { useState, useRef } from "react";

const useStopwatch = () => {
  const [time, setTime] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  const handleTimer = () => {
    if (isActive) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 1000);
    }
    setIsActive(!isActive);
  };

  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  const handleReset = () => {
    setTime(null);
    setIsActive(false);
    clearInterval(intervalRef.current);
  };

  return {
    hours,
    minutes,
    seconds,
    isActive,
    handleTimer,
    handleReset
  };
};

export default useStopwatch;
