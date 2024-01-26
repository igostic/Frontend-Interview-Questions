import { useState } from "react";
import "./styles.css";
const useCopy = () => {
  const copy = async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard is not enabled or available");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error(`There was error copying text: ${text}`, error);
    }
  };

  return copy;
};

export default function App() {
  const [value, setValue] = useState("");
  const copy = useCopy();
  return (
    <div className="App">
      <div>
        <textarea value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
      <button
        onClick={() => {
          console.log(value);
          copy(value);
        }}
      >
        copy
      </button>
    </div>
  );
}
