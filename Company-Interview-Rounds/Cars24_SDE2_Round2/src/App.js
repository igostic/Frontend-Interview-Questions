import CheckboxGroup from "./components/CheckboxGroup";
import "./styles.css";
import React, { useState } from "react";
import data from "../data";

export default function App() {
  const [checkData, setCheckData] = useState(data);

  function handleSubmit() {
    console.log("submit clicked", checkData);
  }
  const handleChange = (changedData) => {
    console.log(changedData, "checked data");

    // setCheckData([...checkData, changedData]);
  };
  return (
    <div className="App">
      {checkData.map((data, index) => (
        <React.Fragment key={index + "1"}>
          <p>{data.question}</p>
          <CheckboxGroup {...data} index={index} handleChange={handleChange} />
        </React.Fragment>
      ))}
      <button onClick={handleSubmit}>Submit Response</button>
    </div>
  );
}
