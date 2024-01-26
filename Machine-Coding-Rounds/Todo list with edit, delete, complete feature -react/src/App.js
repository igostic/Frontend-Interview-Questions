// https://www.youtube.com/watch?v=pzj6ocsnHzw&list=PL_KW_uw2ITn_J_BNfTpv-yePk8vcyg4dp&index=8&ab_channel=Learnersbucket
// https://learnersbucket.com/examples/interview/editable-todo-list-in-react/

import { useRef, useState } from "react";
import "./styles.css";
import Item from "./components/Item";

export default function App() {
  const [todos, setTodos] = useState([]);
  // creating it as we want to clear the input box
  // post click of enter
  const inputRef = useRef();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setTodos([
        ...todos,
        { text: e.target.value, completed: false, id: Date.now() }
      ]);
      inputRef.current.value = "";
    }
  };

  // toggle completed
  const handleCompleted = (id) => {
    const updatedList = todos.map((e) => {
      if (e.id === id) {
        e.completed = !e.completed;
      }

      return e;
    });

    setTodos(updatedList);
  };

  // delete item
  const handleDelete = (id) => {
    const filter = todos.filter((e) => e.id !== id);
    setTodos(filter);
  };

  // handle text update
  const handleUpdateText = (id, text) => {
    const updatedList = todos.map((e) => {
      if (e.id === id) {
        e.text = text;
      }

      return e;
    });

    setTodos(updatedList);
  };

  return (
    <div className="App">
      <input type="text" onKeyPress={handleKeyPress} ref={inputRef} />
      {todos.map((e) => (
        <Item
          {...e}
          key={e.id}
          updateCompleted={handleCompleted}
          deleteTodo={handleDelete}
          updateText={handleUpdateText}
        />
      ))}
    </div>
  );
}
