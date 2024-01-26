// Loader.js
import "./styles.css";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function Loader({ id, changeCompletion }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    let timer;

    // Update width until it reaches 100%
    if (width < 100) {
      timer = setTimeout(() => {
        setWidth((prevWidth) => prevWidth + 1);
      }, 100);
    } else {
      // Notify parent component about completion
      changeCompletion(id);
    }

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, [width, id, changeCompletion]);

  return (
    <div className="loader-container">
      <div className="loader-bar" style={{ width: `${width}%` }}></div>
    </div>
  );
}

Loader.propTypes = {
  id: PropTypes.number.isRequired,
  changeCompletion: PropTypes.func.isRequired,
};
