import React, { useState, useEffect } from "react";

import "./styles.css";
import TextInput from "./components/TextInput";
import Slider from "./components/Slider";

export default function App() {
  const [cost, setCost] = useState(100000);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState((cost / 7).toFixed());
  const [installment, setInstallment] = useState("");
  const [tenure, setTenure] = useState(12);
  const tenureList = [12, 24, 36, 48, 60];

  function claculateEmi() {
    let p = cost - downPayment + (fee * downPayment) / 100;
    let r = interest / 100;
    let n = tenure / 12;
    const EMI = (p * r * (1 + r) ** n) / ((1 + r) ** n - 1);
    return Number(EMI / 12).toFixed(0);
  }
  const EMI = claculateEmi();

  useEffect(() => {
    setInstallment(EMI);
  });
  const handleTenureChange = (selectedTenure) => {
    setTenure(selectedTenure);
  };

  const finalDownPayment =
    Number(downPayment) + (fee * Number(downPayment)) / 100;

  return (
    <div className="App">
      <h1>EMI calculator</h1>
      <TextInput
        title="Total cost of Asset"
        getvalue={setCost}
        defaultv={cost}
      />
      <TextInput
        title="interest rate in % "
        getvalue={setInterest}
        defaultv={interest}
      />
      <TextInput
        title="Processsing fee in % "
        getvalue={setFee}
        defaultv={fee}
      />

      <Slider
        title="Down Payment "
        max={(cost / 2).toFixed()}
        min={(cost / 10).toFixed()}
        defaultv={downPayment}
        getvalue={setDownPayment}
        step="20"
      />

      <label>Tenure in months</label>
      <div className="Buttons">
        {tenureList.map((i, idx) => (
          <div
            className={"Button " + (i === tenure ? " active" : "")}
            active={i === tenure}
            onClick={() => handleTenureChange(i)}
            key={i + idx}
          >
            {i}
          </div>
        ))}
      </div>
      <hr />
      <label>Final Downpayment: {finalDownPayment}</label>
      <label>Tenure in months: {tenure}</label>
      <label>Final installment per month: {installment}</label>
    </div>
  );
}
