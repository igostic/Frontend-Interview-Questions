import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const initialList = ["apple", "Kiwi", "pears"];

  const [list, setList] = useState(initialList);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let filteredList = initialList.filter((item) =>
      item.toLowerCase().includes(searchText.toLowerCase())
    );
    setList(filteredList);
  }, [searchText]);

  function handleChange(e) {
    const { value } = e.target;
    setSearchText(value);
  }

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
