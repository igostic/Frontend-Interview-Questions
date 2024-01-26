import "./styles.css";

// App.js

import React, { useReducer } from "react";
import Counter from "./Counter";

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const App = () => {
  // useReducer at the app level
  const [state, dispatch] = useReducer(appReducer, { count: 0 });

  return (
    <div>
      <h1>My App</h1>
      {/* Pass down state and dispatch to child components */}
      <Counter state={state} dispatch={dispatch} />
      {/* Add more components as needed */}
    </div>
  );
};

export default App;
