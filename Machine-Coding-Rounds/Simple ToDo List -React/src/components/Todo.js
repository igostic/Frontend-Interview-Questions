import React, { useState, useRef, useEffect } from "react";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  function addTask() {
    if (inputValue.trim() !== "") {
      // Add a new task to the todo list
      const uniqueTodos = new Set([...todos, inputValue]);
      setTodos([...uniqueTodos]);
      // Clear the input field after adding a task
      setInputValue("");
    }
  }

  function deleteTodo(value) {
    // Delete a task from the todo list
    setTodos(todos.filter((item) => item !== value));
  }

  function startEditing(task) {
    // Start editing a task - set the editing task and populate the input field
    setEditingTask(task);
    setInputValue(task);
    inputRef.current.focus();
  }

  function finishEditing() {
    if (editingTask !== null) {
      // Finish editing a task - update the task in the todo list
      const updatedTodos = todos.map((task) =>
        task === editingTask ? inputValue : task,
      );
      setTodos(updatedTodos);
      // Clear the input field and reset editingTask
      setInputValue("");
      setEditingTask(null);
    }
  }

  return (
    <>
      {/* Input field for entering or editing tasks */}
      <input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => {
          // Add or update task when the Enter key is pressed
          if (e.key === "Enter") {
            editingTask !== null ? finishEditing() : addTask();
          }
        }}
      />
      {/* Button to add or update a task */}
      <button onClick={editingTask !== null ? finishEditing : addTask}>
        {editingTask !== null ? "Update Task" : "Add Task"}
      </button>

      {/* Display the list of todos */}
      <ul>
        {todos.map((item, index) => (
          <li key={index}>
            {/* Display each task and provide buttons for delete and edit */}
            {item} <button onClick={() => startEditing(item)}>edit</button>{" "}
            <button onClick={() => deleteTodo(item)}>delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
