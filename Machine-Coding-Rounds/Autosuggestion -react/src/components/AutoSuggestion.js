// // AutoSuggestion.js
// import React, { useState, useRef } from "react";
// import useSuggestions from "../customHook/useSuggestions";

// const AutoSuggestion = () => {
//   const inputRef = useRef();
//   const suggestionAreaRef = useRef();
//   const [suggestionAreaVisible, setSuggestionAreaVisible] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const { list } = useSuggestions(searchQuery);

//   const handleChange = (e) => {
//     const { value } = e.target;
//     setSuggestionAreaVisible(true);

//     setSearchQuery(value);
//   };

//   const handleClick = (e) => {
//     setSearchQuery(e);
//     inputRef.current.focus();
//   };

//   React.useEffect(() => {
//     window.addEventListener("click", (e) => {
//       if (
//         e.target !== inputRef.current &&
//         e.target !== suggestionAreaRef.current
//       )
//         setSuggestionAreaVisible(false);

//       return () => {
//         window.removeEventListener("click", () => {});
//       };
//     });
//   }, []);

//   return (
//     <main className="App">
//       <input
//         type="text"
//         name="search"
//         placeholder="search your query"
//         value={searchQuery}
//         id="search"
//         onFocus={() => setSuggestionAreaVisible(true)}
//         ref={inputRef}
//         onChange={handleChange}
//       />
//       {suggestionAreaVisible && (
//         <div id="suggestion-area" ref={suggestionAreaRef}>
//           <ul>
//             {list.map((val, idx) => (
//               <li key={`${val}_${idx}`} onClick={() => handleClick(val)}>
//                 {val}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </main>
//   );
// };

// export default AutoSuggestion;
