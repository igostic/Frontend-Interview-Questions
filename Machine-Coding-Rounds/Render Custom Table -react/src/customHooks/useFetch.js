// useFetch.js
import { useState, useEffect } from "react";

function useFetch(endPoint) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(endPoint);
      const data = await response.json();
      setData(data);
    }

    fetchData();
  }, [endPoint]);

  return data;
}

export default useFetch;
