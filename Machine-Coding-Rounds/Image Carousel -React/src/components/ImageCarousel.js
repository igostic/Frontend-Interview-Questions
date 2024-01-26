import { useEffect, useState, useCallback } from "react";
import Card from "./Card";

const ImageCarousel = ({ images, duration, width, height, alignment }) => {
  const [active, setActive] = useState(0);
  const onNext = useCallback(() => {
    if (active < images.length - 1) {
      setActive(active + 1);
    } else if (active === images.length - 1) {
      setActive(0);
    }
  }, [active]);

  const onPrev = useCallback(() => {
    if (active > 0) {
      setActive(active - 1);
    } else {
      setActive(images.length - 1);
    }
  }, [active]);

  // useEffect(() => {
  //   let interval;
  //   interval = setInterval(() => {
  //     // Automatically advance to the next slide
  //     onNext();
  //   }, duration);
  //   // Clear interval on component cleanup
  //   return () => clearInterval(interval);
  // }, [active, onNext]);

  return (
    // <div className={`slideshow ${alignment}`}>
    <div className="slideshow">
      {images.map((e, i) => (
        <Card
          {...e}
          key={e.caption}
          active={i === active}
          width={width}
          height={height}
        />
      ))}
      {/* <div className="bulleted-navigation">
        {images.map((e, i) => (
          <div
            className={`dot ${i === active ? "active" : ""}`}
            key={e.caption}
            onClick={() => setActive(i)}
          />
        ))}
      </div> */}
      <div className="next-prev-navigation">
        <div className="navigation next" onClick={onNext}>
          &gt;
        </div>
        <div className="navigation prev" onClick={onPrev}>
          &lt;
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
