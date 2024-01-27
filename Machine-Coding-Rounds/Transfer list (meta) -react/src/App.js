import Actions from "./components/Actions";
import List from "./components/List";
import "./styles.css";
import { items } from "./data";
import { useState } from "react";
import { diff, notChecked } from "./utils/utils";

export default function App() {
  const [leftItems, setLeftItems] = useState(items);
  const [rightItems, setRightItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  const leftCheckedItems = diff(leftItems, checkedItems);
  const rightCheckedItems = diff(rightItems, checkedItems);

  const handleToggle = (item) => {
    const currIndex = checkedItems.indexOf(item);
    const tempCheckedItems = [...checkedItems];
    // means item is not already checked
    if (currIndex === -1) {
      tempCheckedItems.push(item);
    } else {
      tempCheckedItems.splice(currIndex, 1);
    }
    setCheckedItems(tempCheckedItems);
  };

  const moveRight = () => {
    setRightItems(rightItems.concat(leftCheckedItems));
    setLeftItems(notChecked(leftItems, leftCheckedItems));
    setCheckedItems(notChecked(checkedItems, leftCheckedItems));
  };
  const moveLeft = () => {
    setLeftItems(leftItems.concat(rightCheckedItems));
    setRightItems(notChecked(rightItems, rightCheckedItems));
    setCheckedItems(notChecked(checkedItems, rightCheckedItems));
  };

  return (
    <div className="App flex">
      <List items={leftItems} handleToggle={handleToggle} />
      <Actions moveRight={moveRight} moveLeft={moveLeft} />
      <List items={rightItems} handleToggle={handleToggle} />
    </div>
  );
}
