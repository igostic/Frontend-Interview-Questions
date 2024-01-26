import "./styles.css";

import explorer from "./data/data";

import Folder from "./component/Folder";
export default function App() {
  return (
    <div className="App">
      <Folder explorer={explorer} />
    </div>
  );
}
