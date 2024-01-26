// React Compound Pattern
// What is Compound Pattern?
// 1. Multiple components come together to serve a common functionality
// 2. Think of Select tag where select and option tag jointly help us create dropdowns
// 3. React Context APls plays a very important role in Compound pattern
// 4. Common use cases includes select, dropdown components, or menu items.
import "./styles.css";

import { useState } from "react";
import Tab from "./components/Tab";
export default function App() {
  // active index
  const [currentIndex, setIndex] = useState(0);

  const handleChange = (newIndex) => {
    setIndex(newIndex);
  };
  return (
    <div className="App">
      <Tab value={currentIndex} onChange={handleChange}>
        <Tab.Heads>
          <Tab.Item label={"Tab1"} index={0} />
          <Tab.Item label={"Tab2"} index={1} />
          <Tab.Item label={"Tab3"} index={2} />
        </Tab.Heads>
        <Tab.ContentWrapper>
          <Tab.Content index={0}>
            <h1>I am content 1</h1>
          </Tab.Content>
          <Tab.Content index={1}>
            <h1>I am content 2</h1>
          </Tab.Content>
          <Tab.Content index={2}>
            <h1>I am content 3</h1>
          </Tab.Content>
        </Tab.ContentWrapper>
      </Tab>
    </div>
  );
}
