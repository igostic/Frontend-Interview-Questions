import "./styles.css";
import useToggle from "./hooks/useToggle";
export default function App() {
  const [toggle, value] = useToggle([1, 2, 3, 4, 5], 2);
  return (
    <div className="App">
      <h1>Current value: {value}</h1>

      <button onClick={toggle}>Toggle</button>
    </div>
  );
}
