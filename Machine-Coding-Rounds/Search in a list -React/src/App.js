import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [list, setList] = useState(["apple", "Kiwi", "pears"]);
  const [searchText, setSearchText] = useState("");
  function handleChange(e) {
    const { value } = e.target;
    setSearchText(value);
  }
  useEffect(() => {
    let filteredList = list.filter((item) =>
      item.toLowerCase().includes(searchText.toLowerCase()),
    );
    setList(filteredList);
  }, [searchText]);
  return (
    <div className="App">
      <input value={searchText} onChange={handleChange} />
      <ul>
        {list.map((item, idx) => (
          <li key={item + idx}>{item}</li>
        ))}
      </ul>
      {searchText}
    </div>
  );
}
