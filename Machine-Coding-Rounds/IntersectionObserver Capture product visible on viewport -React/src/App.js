// https://learnersbucket.com/examples/interview/capture-product-visible-on-viewport-when-user-stops-scrolling/
// https://www.youtube.com/watch?v=kjohGEZjco8&list=PL_KW_uw2ITn_J_BNfTpv-yePk8vcyg4dp&index=14&ab_channel=Learnersbucket

import React, { useEffect } from "react";
import "./styles.css";

const detect = () => {
  const result = [];
  const blocks = document.querySelectorAll(".blocks");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          result.push(entry.target.textContent);
        }
      });
      console.log({ result });
    },
    { threshold: 1 }
  ); // Change the threshold as needed (0.5 means 50% visibility)

  blocks.forEach((block) => {
    observer.observe(block);
  });
};

const debounce = (fn, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(args);
    }, delay);
  };
};

const App = () => {
  useEffect(() => {
    // const onScroll = debounce(detect, 1000);
    const onScroll = detect;

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="wrapper">
      {Array.from({ length: 30 }, (_, index) => (
        <div key={index} className="blocks">
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default App;
