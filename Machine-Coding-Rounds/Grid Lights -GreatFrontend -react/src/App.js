import { useState } from "react";
import "./styles.css";
// import Cell from "./components/Cell";
// only need to included isDisabled to prevent
// not to click one cell twice
// (when interviewer asks only)
function Cell({ filled, onClick, isDisabled, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      // disabled={isDisabled}
      // aria-label={label}
      className={filled ? "cell cell-activated" : "cell"}
    />
  );
}
export default function App() {
  // keep track of order in which cells are clicked
  const [order, setOrder] = useState([]);
  // need to maintain the deactivating state too
  const [isDeactivating, setIsDeactivating] = useState(false);
  // can change the config easily
  // for scalable solution
  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
  ];
  const deactivateCells = () => {
    setIsDeactivating(true);
    const timer = setInterval(() => {
      // to fetch the latest state each time
      setOrder((prevOrder) => {
        // getting deep copy of origOrder so
        // that we don't mutate the order arr
        // const newOrder = origOrder.slice();
        const newOrder = [...prevOrder];
        newOrder.pop();
        if (newOrder.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }
        return newOrder;
      });
    }, 300);
  };

  const activateCells = (idx) => {
    // we are adding the index to the arr
    const newOrder = [...order, idx];
    setOrder(newOrder);
    // setOrder((prevOrder) => {
    //   return {
    //     ...prevOrder,
    //     idx
    //   };
    // });
    // need to start the deactivation
    // filter(Boolean) removes the falsy
    // values from config
    if (newOrder.length === config.flat(1).filter(Boolean).length) {
      deactivateCells();
    }
  };
  return (
    <div className="wrapper">
      <div
        className="grids"
        // 1fr means that each column will take up
        // an equal fraction of the available space.
        // adding for dynamic rendering
        style={{ gridTemplateColumns: `repeat(${config[0].length}, 1fr)` }}
      >
        {config.flat(1).map((val, idx) => {
          // only render if there is one in config else empty span
          return val ? (
            <Cell
              key={idx + "_"}
              // filled={false}
              filled={order.includes(idx)}
              onClick={() => activateCells(idx)}
              // only when interview points it out
              // isDisabled={order.includes[idx] || isDeactivating}
              // to add accessibility
              // label={`Cell ${idx}`}
            />
          ) : (
            <span key={idx + "_"} />
          );
        })}
      </div>
    </div>
  );
}
