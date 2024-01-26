import { useEffect, useState } from "react";
import ProgressBar from "./components/ProgressBar";
import "./styles.css";

export default function App() {
  const [value, setValue] = useState(0);
  // for onCompletion as scalable component
  // const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (value > 99) return;
    const id = setInterval(() => {
      setValue((value) => value + 1);
    }, 100);
    return () => {
      clearInterval(id);
    };
  }, [value]);
  return (
    <div className="app">
      <span>Progress Bar</span>
      <ProgressBar
        value={value}
        // to make a scalable component we can do like this
        // onStart={() => {}} />
        // onCompletion={() => {
        //   console.log("jjj");
        //   setSuccess(true);
        // }}
      />
      {/* <span>{success ? "Completed" : "Loading..."}</span> */}
    </div>
  );
}
