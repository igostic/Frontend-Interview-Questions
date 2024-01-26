import "./styles.css";

import { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);
  // infinite scroll
  const [page, setPage] = useState(0);

  const fetchData = async () => {
    try {
      // setLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?page=${page}`,
      );
      const resp = await response.json();
      // setData(resp);
      // for infinite scroll
      setData((prev) => [...prev, ...resp]);
      // setLoading(false);
    } catch (err) {
      // setLoading(false);
      console.log(err.message);
    }
  };
  // fetchData();

  // Debounce function
  // const debounce = (func, delay) => {
  //   let timeoutId;
  //   return function (...args) {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => {
  //       func(...args);
  //     }, delay);
  //   };
  // };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      window.document.body.offsetHeight - 30
      // && !loading
    ) {
      // setLoading(true);
      setPage((prev) => prev + 1);
      fetchData();
    }
  };
  // for the first load
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // const debouncedHandleScroll = debounce(handleScroll, 200); // Adjust the delay as needed

    // window.addEventListener("scroll", debouncedHandleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="App">
      {data.map((item) => (
        <div key={item.id}>
          <h3>Title: {item.title}</h3>
        </div>
      ))}
    </div>
  );
}
