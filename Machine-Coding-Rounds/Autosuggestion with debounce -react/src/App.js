import { useState } from "react";
import "./styles.css";
import useDebounce from "./customHooks/useDebounce";

export default function App() {
  const [search, setSearch] = useState([]);
  // Add a state to hold input value
  const handleChange = (event) => {
    // api call
    const { value } = event.target;
    fetch(`https://demo.dataverse.org/api/search?q=${value}`)
      .then((response) => response.json())
      .then((resp) => {
        console.log("resp -->>", resp.data.items);
        setSearch(resp.data.items);
      });
  };

  // on every render, debounce will written new func
  // so to prevent it we use useCallback()
  // const debouncedFn = useCallback(useDebounce(handleChange, 400), []);

  const debouncedFn = useDebounce(handleChange, 400);
  return (
    <div className="App">
      <input
        type="text"
        placeholder="Enter your query"
        className="search"
        onChange={debouncedFn}
      />

      {search && search?.length ? (
        <div className="autocomplete">
          {search?.map((val, idx) => (
            <div key={`${idx}_${val.name}`} className="autocompleteItems">
              <span>{val.name}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
