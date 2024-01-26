// https://learnersbucket.com/examples/interview/implement-infinite-scroll-in-react/
// https://www.youtube.com/watch?v=Ckka1HhE2kM&list=PL_KW_uw2ITn_J_BNfTpv-yePk8vcyg4dp&index=4&ab_channel=Learnersbucket

import { useEffect, useState } from "react";

export default function App() {
  // initially loaded items on DOM
  // we are taking 50 for our case
  const [count, setCount] = useState(50);

  // listen to scroll event
  useEffect(() => {
    const onScroll = () => {
      // - 30 value is added as a buffer time before
      // reaching at end you start loading the data
      // to improve the user experience
      // but clarify it will interviewer
      // adding buffer of 30px

      if (
        window.innerHeight + window.scrollY >=
        window.document.body.offsetHeight - 30
      ) {
        setCount(count + 50);
      }
    };
    console.log("abc--", count);
    window.addEventListener("scroll", onScroll);

    // run cleanup if someone re-renders or
    // unmounts known as cleanup func

    return () => window.removeEventListener("scroll", onScroll);
  }, [count]);

  const elements = [];
  for (let i = 0; i < count; i++) {
    elements.push(<div key={i + 1}>{i + 1}</div>);
  }
  return (
    <div className="App">
      <main>{elements}</main>
    </div>
  );
}

// onScroll Function:
// This is the event handler for the scroll event.
// const onScroll = () => { ... }

// window.innerHeight: This represents the height of the
// browser window's content area. It's the visible
// portion of the web page.

// window.scrollY: This gives the number of pixels that
// the document is currently scrolled vertically.

// window.document.body.offsetHeight: This gives the total
// height of the document, including any content that may
// not be visible due to scrolling.

// This condition checks if the user has scrolled to within
// 30 pixels from the bottom of the page. If true, it means
// the user is near the end of the page and more items
// should be loaded.
// (window.innerHeight + window.scrollY >= window.document.body.offsetHeight - 30)

// optimised code

// import React, { useEffect, useState, useRef } from "react";

// // Memoized component to prevent unnecessary re-renders
// const MemoizedDiv = React.memo(({ index }) => <div key={index}>{index}</div>);

// // Throttle function to limit the frequency of function calls
// const throttle = (func, delay) => {
//   let lastExecTime = 0;

//   return function (...args) {
//     const now = Date.now();

//     if (now - lastExecTime >= delay) {
//       func(...args);
//       lastExecTime = now;
//     }
//   };
// };

// export default function App() {
//   // Initially loaded items on DOM (50 for our case)
//   const [count, setCount] = useState(50);

//   // Use useRef for a stable reference to the window object
//   const windowRef = useRef(window);

//   // Throttle scroll events to improve performance
//   const onScroll = throttle(() => {
//     // Buffer of 30px before reaching the end to start loading more data
//     if (
//       windowRef.current.innerHeight + windowRef.current.scrollY >=
//       windowRef.current.document.body.offsetHeight - 30
//     ) {
//       // Batch updates using functional form of setState
//       setCount((prevCount) => prevCount + 50);
//     }
//   }, 200); // Throttle time (adjustable as needed)

//   useEffect(() => {
//     // Use requestAnimationFrame for scroll events
//     const handleScroll = () => {
//       onScroll();
//     };

//     windowRef.current.addEventListener("scroll", handleScroll);

//     // Cleanup function for removing the event listener
//     return () => {
//       windowRef.current.removeEventListener("scroll", handleScroll);
//     };
//   }, [count]);

//   // Optimize the loop using Array.from
//   const elements = Array.from({ length: count }, (_, index) => (
//     <MemoizedDiv key={index + 1} index={index + 1} />
//   ));

//   return (
//     <div className="App">
//       <main>{elements}</main>
//     </div>
//   );
// }
