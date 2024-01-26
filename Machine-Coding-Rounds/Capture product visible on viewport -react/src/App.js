// https://learnersbucket.com/examples/interview/capture-product-visible-on-viewport-when-user-stops-scrolling/
// https://www.youtube.com/watch?v=kjohGEZjco8&list=PL_KW_uw2ITn_J_BNfTpv-yePk8vcyg4dp&index=14&ab_channel=Learnersbucket

import React, { useEffect } from "react";
import "./styles.css";

const inViewPort = (ele) => {
  const elmDim = ele.getBoundingClientRect();
  const viewHeight = window.innerHeight;
  const viewWidth = window.innerWidth;

  return (
    elmDim.top >= 0 &&
    elmDim.left >= 0 &&
    elmDim.right <= viewWidth &&
    elmDim.bottom <= viewHeight
  );
};

const detect = () => {
  const result = [];
  const blocks = document.querySelectorAll(".blocks");
  blocks.forEach((block) => {
    if (inViewPort(block)) {
      result.push(block.textContent);
    }
  });
  console.log({ result });
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
    const onScroll = debounce(detect, 1000);

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
