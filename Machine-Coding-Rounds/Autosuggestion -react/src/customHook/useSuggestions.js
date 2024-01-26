// import { useState, useRef, useEffect } from "react";

// // Mock Server
// const FAILURE_COUNT = 10;
// const LATENCY = 200;

// function getRandomBool(n) {
//   const threshold = 1000;
//   if (n > threshold) n = threshold;
//   return Math.floor(Math.random() * threshold) % n === 0;
// }

// function getSuggestions(text) {
//   var pre = "pre";
//   var post = "post";
//   var results = [];
//   if (getRandomBool(2)) {
//     results.push(pre + text);
//   }
//   if (getRandomBool(2)) {
//     results.push(text);
//   }
//   if (getRandomBool(2)) {
//     results.push(text + post);
//   }
//   if (getRandomBool(2)) {
//     results.push(pre + text + post);
//   }
//   return new Promise((resolve, reject) => {
//     const randomTimeout = Math.random() * LATENCY;
//     setTimeout(() => {
//       if (getRandomBool(FAILURE_COUNT)) {
//         reject();
//       } else {
//         resolve(results);
//       }
//     }, randomTimeout);
//   });
// }

// const useSuggestions = (query) => {
//   const [list, setList] = useState([]);

//   useEffect(() => {
//     let isMounted = true;

//     const getSuggestionsData = async () => {
//       try {
//         const resp = await getSuggestions(query);
//         if (isMounted) {
//           setList(resp);
//         }
//       } catch (error) {
//         console.error("Error while making the api call", error);
//         setList([]);
//       }
//     };

//     if (query) {
//       getSuggestionsData();
//     } else {
//       setList([]);
//     }

//     return () => {
//       isMounted = false;
//     };
//   }, [query]);

//   return { list };
// };

// export default useSuggestions;
