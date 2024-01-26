import "./styles.css";

// all commented part is for when we select any list li from
// suggestion box it will take the value paste in the inp box
// do manipulations
import React, { useState, useRef, useEffect } from "react";

// Mock Server
const FAILURE_COUNT = 10;
const LATENCY = 200;

function getRandomBool(n) {
  const threshold = 1000;
  if (n > threshold) n = threshold;
  return Math.floor(Math.random() * threshold) % n === 0;
}

function getSuggestions(text) {
  var pre = "pre";
  var post = "post";
  var results = [];
  if (getRandomBool(2)) {
    results.push(pre + text);
  }
  if (getRandomBool(2)) {
    results.push(text);
  }
  if (getRandomBool(2)) {
    results.push(text + post);
  }
  if (getRandomBool(2)) {
    results.push(pre + text + post);
  }
  return new Promise((resolve, reject) => {
    const randomTimeout = Math.random() * LATENCY;
    setTimeout(() => {
      if (getRandomBool(FAILURE_COUNT)) {
        reject();
      } else {
        resolve(results);
      }
    }, randomTimeout);
  });
}

export default function App() {
  // creating two reference to monitor the focus
  const inputRef = useRef();
  // const suggestionAreaRef = useRef();
  const [suggestionAreaVisible, setSuggestionAreaVisible] = useState(false);
  const [list, setList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // const debounce = (func) => {
  //   let timerId;
  //   return function (...args) {
  //     const context = this;
  //     clearTimeout(timerId);
  //     timerId = setTimeout(() => {
  //       func.apply(context, args);
  //     }, 1000);
  //   };
  // };
  const handleChange = (e) => {
    const { value } = e.target;
    console.log("-->", value);
    setSearchQuery(value);
    makeApiCall(value);

    // required to show the suggestion box post as we
    // selected from suggestion box need to keep box visible
    // setSuggestionAreaVisible(true);
  };

  // const handleClick = (val) => {
  //   setSearchQuery(val);
  //   inputRef.current.focus();
  // };

  const makeApiCall = async (query) => {
    try {
      let resp = await getSuggestions(query);
      setList(resp);
      // let resp = await fetch(
      //   `https://demo.dataverse.org/api/search?q=${query}`
      // );
      // let res = await resp.json();
      // console.log("-->>", res.data.items);
      // setList(res.data.items);
    } catch (error) {
      setList([]);
      console.log("Error while making the api call", error);
    }
  };

  // on every render, debounce will written new func
  // so to prevent it we use useCallback()
  // const debouncedFn = useCallback(debounce(handleChange), [searchQuery]);

  // useEffect(() => {
  //   window.addEventListener("click", (e) => {
  //     if (
  //       e.target !== inputRef.current &&
  //       e.target !== suggestionAreaRef.current
  //     )
  //       // setSuggestionAreaVisible(false);

  //     return () => {
  //       window.removeEventListener("click", () => {});
  //     };
  //   });
  // });
  return (
    <main className="App">
      <input
        type="text"
        // name="search"
        placeholder="search your query"
        value={searchQuery}
        id="search"
        onFocus={() => setSuggestionAreaVisible(true)}
        ref={inputRef}
        // onChange={debouncedFn}
        onChange={handleChange}
      />
      {suggestionAreaVisible && (
        <div
          id="suggestion-area"
          // ref={suggestionAreaRef}
        >
          <ul>
            {list &&
              list.map((val, idx) => (
                // <li key={`${val}_${idx}`} onClick={() => handleClick(val)}>
                <li key={`${val}_${idx}`}>{val}</li>
              ))}
          </ul>
        </div>
      )}
    </main>
  );
}

// modifying for custom hooks
// import "./styles.css";

// import React from "react";
// import AutoSuggestion from "../src/components/AutoSuggestion";

// function App() {
//   return (
//     <div className="App">
//       <AutoSuggestion />
//     </div>
//   );
// }

// export default App;
