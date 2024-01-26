import { useEffect, useState } from "react";
import Light from "./Light";

export default function TrafficLight({
  initialColor = "green",
  config,
  layout = "vertical"
}) {
  const [currentColor, setCurrentColor] = useState(initialColor);

  useEffect(() => {
    const { duration, next } = config[currentColor];
    const timerId = setTimeout(() => {
      setCurrentColor(next);
    }, duration);

    // return () => {
    //   console.log("cleanup");
    //   clearTimeout(timerId);
    // };
  }, [currentColor]);

  return (
    <>
      <div
        // for accessbility we are using aria-label
        // aria-label={`Current light: ${currentColor}`}
        className={`traffic-light-container ${
          layout === "vertical" ? "traffic-light-container--vertical" : ""
        }`}
      >
        {Object.keys(config).map((color) => (
          <Light
            key={color}
            backgroundColor={
              color === currentColor ? config[color].backgroundColor : undefined
            }
          />
        ))}
      </div>
    </>
  );
}
