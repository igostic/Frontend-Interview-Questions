import { useEffect } from "react";
import "./styles.css";
import useLocalStorage from "./customHooks/useLocalStorage";

// Example usage:
const App = () => {
  // Usage of useLocalStorage hook
  const [value, setValue] = useLocalStorage("exampleKey", 2);

  useEffect(() => {
    // Ensure that the component doesn't cause infinite re-renders
    setValue(3);
  }, []);

  return (
    <div>
      <p>Stored Value: {value}</p>
    </div>
  );
};

export default App;
