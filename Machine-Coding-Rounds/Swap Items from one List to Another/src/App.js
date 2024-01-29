import React, { useState } from 'react';
import './style.css';
export default function App() {
  const [list1, setList1] = useState([
    {
      title: 'Item 1',
      checked: false,
    },
    {
      title: 'Item 2',
      checked: false,
    },
    {
      title: 'Item 3',
      checked: false,
    },
  ]);
  const [list2, setList2] = useState([
    {
      title: 'Item A',
      checked: false,
    },
    {
      title: 'Item B',
      checked: false,
    },
    {
      title: 'Item C',
      checked: false,
    },
  ]);

  const handleCheckboxChange = (idx) => {
    const updatedList1 = [...list1];
    updatedList1[idx].checked = !updatedList1[idx].checked;
    setList1(updatedList1);
  };

  const handleSwap = () => {
    const updatedList1 = [...list1];
    const updatedList2 = [...list2];
    updatedList1.forEach((item, idx) => {
      if (item.checked) {
        const temp = updatedList1[idx].title;
        updatedList1[idx].title = updatedList2[idx].title;
        updatedList2[idx].title = temp;
      }
      // making checked as false again to restore
      item.checked = false;
    });
    setList1(updatedList1);
    setList2(updatedList2);
  };
  return (
    <div className="App">
      <div>
        <h3>List 1</h3>
        <ul>
          {list1.map((item, idx) => (
            <li key={item + idx}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheckboxChange(idx)}
              />
              {item.title}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>List 2</h3>
        <ul>
          {list2.map((item, idx) => (
            <li key={item + idx}>{item.title}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleSwap}>Swap List Items</button>
    </div>
  );
}
