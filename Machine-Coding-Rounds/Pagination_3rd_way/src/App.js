import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todosPerPage, setTodosPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const fetchApi = async () => {
      const resp = await fetch("https://jsonplaceholder.typicode.com/posts");
      const response = await resp.json();
      setTodos(response);
    };
    fetchApi();
  }, []);

  const numOfPages = Math.ceil(todos?.length / todosPerPage);

  // logic to show only desired todos
  const indexOfLastTodo = currentPage * todosPerPage;
  // const indexOfFirstTodo = (currentPage - 1) * todosPerPage;
  // or
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const visibleTodos = todos?.slice(indexOfFirstTodo, indexOfLastTodo);
  const handlePageChange = (currPage) => {
    setCurrentPage(currPage);
  };
  console.log({
    todosPerPage,
    numOfPages,
    visibleTodos,
    indexOfFirstTodo,
    indexOfLastTodo,
  });
  return (
    <>
      {/* code for dropdown also */}
      <select onChange={(e) => setTodosPerPage(e.target.value)}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">50</option>
      </select>

      {/* end------ */}
      <div className="App">
        {visibleTodos.map((todo, idx) => {
          return <div key={idx}>{todo.title}</div>;
        })}

        <span
          style={{ cursor: "pointer" }}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          {" "}
          {currentPage === 1 ? "" : "Prev"}
        </span>
        {[...Array(numOfPages)].map((_, idx) => (
          <span
            style={{ cursor: "pointer" }}
            onClick={() => handlePageChange(idx + 1)}
            key={idx}
            className={currentPage === idx + 1 ? "active" : ""}
          >
            {idx + 1}
            {idx < numOfPages - 1 ? " | " : ""}
          </span>
        ))}
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {" "}
          {currentPage === numOfPages ? "" : "Next"}
        </span>
      </div>
    </>
  );
}
