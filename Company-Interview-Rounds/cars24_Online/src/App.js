import { useEffect, useState } from "react";

const Btn = ({ inc, count, setCount }) => {
  let incr = +inc;
  console.log(incr);
  return (
    <>
      {count}
      <button onClick={() => setCount((prev) => prev + incr)}>
        {" "}
        By {inc}{" "}
      </button>
    </>
  );
};

export default function App() {
  useEffect(() => {
    console.log("inside useEffect");
    return () => {
      console.log("cleanup");
    };
  }, []);

  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <Btn inc={1} count={count} setCount={setCount} />

      <Btn inc={2} count={count2} setCount={setCount2} />
    </div>
  );
}
