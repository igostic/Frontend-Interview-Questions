// https://levelup.gitconnected.com/react-build-traffic-light-2daa0794b5f4

// import React, { useState, useEffect } from "react";

// const App = () => {
//   const traficLight = [
//     {
//       color: "green",
//       wait: 4000,
//       next: "yellow"
//     },
//     {
//       color: "yellow",
//       wait: 2000,
//       next: "red"
//     },
//     {
//       color: "red",
//       wait: 300,
//       next: "green"
//     }
//   ];
//   // // Initialize state for the currently
//   // active signal (starts with green).
//   const [activeSignal, setActiveSignal] = useState("green");
//   // Find the object that corresponds to
//   // the currently active signal.
//   const light = traficLight.find((lig) => lig.color === activeSignal);

//   useEffect(() => {
//     // Set a timer to transition to the next
//     // signal after a specified wait time.
//     const timerId = setTimeout(() => {
//       setActiveSignal(light.next);
//     }, light.wait);

//     return () => {
//       clearTimeout(timerId);
//     };
//   }, [light, activeSignal]);

//   return (
//     <div className="App" style={{ border: "2px solid black", width: "70px" }}>
//       {traficLight.map((light) => {
//         return (
//           <div
//             style={{
//               width: "50px",
//               height: "50px",
//               backgroundColor:
//                 activeSignal === light.color ? light.color : "grey",
//               border: "solid 1px black",
//               borderRadius: "50%",
//               margin: "10px"
//             }}
//           />
//         );
//       })}
//     </div>
//   );
// };

// export default App;

import TrafficLight from "./components/TrafficLight";

import "./styles.css";
import { config } from "./data/config";

export default function App() {
  return (
    <div className="wrapper">
      <TrafficLight config={config} />
      {/* <TrafficLight config={config} layout="horizontal" /> */}
    </div>
  );
}
