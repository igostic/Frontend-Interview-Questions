import { useEffect, useState } from "react";

// takes this value which will be a percentage value
// const ProgressBar = ({ value = 0, onCompletion = () => {} }) => {
const ProgressBar = ({ value = 0 }) => {
  const [percentage, setPercentage] = useState(value);
  useEffect(() => {
    // handles the edge cases like what's the min & max values
    // ie 0 and 100 resp
    setPercentage(Math.min(100, Math.max(value, 0)));
    // if (value >= 100) {
    //   onCompletion(value);
    // }
  }, [value]);
  // }, [value, onCompletion]);
  return (
    <div className="progress">
      <span
      // apply style latter post completion
      // to show interviewer
      // style={{
      //   color: percentage > 49 ? "white" : "black",
      // }}
      >
        {percentage}%
      </span>
      <div
        style={{
          // width: `${percentage}%`,
          // other way instead of width is transform
          // which is more optimised
          transform: `scaleX(${percentage / 100})`,
          // this transformOrigin left helps to start
          // from left otherwise without this it will
          // go from center to both left and right dir
          transformOrigin: "left",
        }}
      />
    </div>
  );
};

export default ProgressBar;
