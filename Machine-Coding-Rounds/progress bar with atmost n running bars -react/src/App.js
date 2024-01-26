// import React, { useState, useEffect } from "react";
// import "./styles.css";

// export default function App() {
//   const [queue, setQueue] = useState([]);
//   const [activeBars, setActiveBars] = useState([]);
//   const [maxTotal, setMaxTotal] = useState(3);

//   useEffect(() => {
//     const updateProgress = () => {
//       setActiveBars((prevBars) =>
//         prevBars.map((bar) => {
//           if (bar.progress < 100) {
//             return {
//               ...bar,
//               progress: bar.progress + 1,
//             };
//           }
//           return bar;
//         }),
//       );

//       // If there is room for a new progress bar in the queue and the total is within the limit
//       if (queue.length > 0 && activeBars.length < maxTotal) {
//         const newBar = queue.shift();
//         setActiveBars((prevBars) => [...prevBars, newBar]);
//       }
//     };

//     const interval = setInterval(updateProgress, 100);

//     return () => clearInterval(interval);
//   }, [activeBars, queue, maxTotal]);

//   const addProgressBar = () => {
//     setQueue((prevQueue) => [...prevQueue, createProgressBar()]);
//     // Dynamically update the maxTotal based on user interaction
//     setMaxTotal((prevMaxTotal) => prevMaxTotal + 1);
//   };

//   const createProgressBar = () => {
//     return {
//       id: Date.now(),
//       progress: 0,
//     };
//   };

//   return (
//     <div>
//       <button id="show__btn" onClick={addProgressBar}>
//         Add Bar
//       </button>
//       <div id="progress-bars-container">
//         {activeBars.map((bar) => (
//           <div className="progress__bar" key={bar.id}>
//             <div className="myBar" style={{ width: `${bar.progress}%` }}></div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import "./styles.css";

export default function App() {
  // State to manage the queue of progress bars waiting to be shown
  const [queue, setQueue] = useState([]);
  const maxActive = 2;
  // State to manage the actively running progress bars
  const [activeBars, setActiveBars] = useState([]);

  // useEffect hook to update progress and manage the queue
  useEffect(() => {
    // Function to update progress for active bars and manage the queue
    const updateProgress = () => {
      // Update progress for active bars
      setActiveBars((prevBars) =>
        prevBars.map((bar) => {
          if (bar.progress < 100) {
            return {
              ...bar,
              progress: bar.progress + 1,
            };
          }
          return bar;
        }),
      );

      // If there is room for a new progress bar in
      // the queue and the total is within the limit
      if (queue.length > 0 && activeBars.length < maxActive) {
        const newBar = queue.shift();
        setActiveBars((prevBars) => [...prevBars, newBar]);
      }
    };

    // Start interval to update progress
    const interval = setInterval(updateProgress, 100);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [activeBars, queue]);

  // Function to add a new progress bar to activeBars or queue
  const addProgressBar = () => {
    if (activeBars.length < maxActive) {
      // If there is space, add a new progress bar to activeBars
      setActiveBars((prevBars) => [...prevBars, createProgressBar()]);
    } else {
      // If there is no space, add a new progress bar to the queue
      setQueue((prevQueue) => [...prevQueue, createProgressBar()]);
    }
  };

  // Function to create a new progress bar object
  const createProgressBar = () => {
    return {
      id: Date.now(),
      progress: 0,
    };
  };

  // Function to handle completion of a progress bar
  const handleCompletion = (id) => {
    // Remove completed progress bar from activeBars
    setActiveBars((prevBars) => prevBars.filter((bar) => bar.id !== id));

    // If there are progress bars in the queue, start running one
    if (queue.length > 0) {
      const newBar = queue.shift();
      setActiveBars((prevBars) => [...prevBars, newBar]);
    }
  };

  return (
    <div>
      {/* Button to add a new progress bar */}
      <button id="show__btn" onClick={addProgressBar}>
        Add Bar
      </button>
      {/* Container to display progress bars */}
      <div id="progress-bars-container">
        {activeBars.map((bar) => (
          <Loader
            key={bar.id}
            changeCompletion={handleCompletion}
            id={bar.id}
          />
        ))}
      </div>
    </div>
  );
}
