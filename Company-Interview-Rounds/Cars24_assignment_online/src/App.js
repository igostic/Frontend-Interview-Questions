import data from "./data";
import CompanyDetails from "./Components/CompanyDetails";
import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [carsCount, setCarsCount] = useState(Array(data.length).fill(0));
  const [totalCars, setTotalCars] = useState(0);

  useEffect(() => {
    setTotalCars(carsCount.reduce((sum, count) => sum + count));
  }, [carsCount]);

  const updateCarCount = (carIndex, count) => {
    setCarsCount([
      ...carsCount.slice(0, carIndex),
      count,
      ...carsCount.slice(carIndex + 1)
    ]);
  };

  return (
    <div className="App">
      <h1>Cars Selected - {totalCars}</h1>
      {data.map((companyData, index) => (
        <CompanyDetails
          key={companyData.filter.value}
          companyData={companyData}
          carIndex={index}
          updateCarCount={updateCarCount}
        />
      ))}
    </div>
  );
}
