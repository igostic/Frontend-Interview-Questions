// import { useEffect, useState } from "react";

// const useDebounce = (value, timer) => {
//   const [debounceValue, setDebounceValue] = useState(value);

//   useEffect(() => {
//     const timerId = setTimeout(() => {
//       setDebounceValue(value);
//     }, timer);

//     // cleanup
//     return () => {
//       clearTimeout(timerId);
//     };
//   }, [value]);

//   return debounceValue;
// };

// export default useDebounce;
