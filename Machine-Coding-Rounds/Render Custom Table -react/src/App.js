import "./styles.css";

import React from "react";
import Table from "../src/components/Table";

function App() {
  return (
    <Table
      endPoint="https://jsonplaceholder.typicode.com/users"
      fields={["id", "name", "username", "email"]}
    />
  );
}

export default App;
