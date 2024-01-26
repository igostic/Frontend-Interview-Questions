import { useState, useEffect } from "react";
import View from "./View";

const InfiniteScroll = () => {
  const [response, setResponse] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?` +
        new URLSearchParams({
          _limit: 9,
          _page: page,
        }),
    );
    const data = await res.json();
    setResponse((oldData) => [...oldData, ...data]);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, [page]);

  const onScroll = () => {
    // It evaluates whether the sum of the
    // current viewport height (window.innerHeight),
    // the vertical scroll position (document.documentElement.scrollTop),
    // and a small buffer (2) is greater than or equal to the
    // total height of the webpage (document.documentElement.scrollHeight)
    if (
      window.innerHeight + document.documentElement.scrollTop + 2 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    // run cleanup if someone re-renders or
    // unmounts known as cleanup func

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <View response={response} />
      {loading && <div className="loading"> </div>}
    </>
  );
};

export default InfiniteScroll;
