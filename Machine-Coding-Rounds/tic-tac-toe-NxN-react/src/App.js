import { useState, useEffect } from "react";
import "./styles.css";

const App = ({ size = 2 }) => {
  // State for tracking the current turn (X or O)
  const [xTurn, setXTurn] = useState(true);

  // State for displaying the game result
  const [gameResult, setGameResult] = useState("");

  // State for controlling the visibility of the restart button
  const [restartVisible, setRestartVisible] = useState(false);

  // State for representing the state of each box in the Tic-Tac-Toe grid
  const [boxes, setBoxes] = useState([]);

  // useEffect hook to initialize the boxes state based on the size prop
  useEffect(() => {
    // Check if size is a positive integer
    if (Number.isInteger(size) && size > 0) {
      // Initialize boxes state with an array of size * size, filled with empty strings
      setBoxes(Array(size * size).fill(""));
    } else {
      console.error(
        "Invalid size. Please provide a positive integer for the grid size."
      );
    }
  }, [size]);

  // Function to handle click events on the Tic-Tac-Toe boxes
  const handleClick = (index) => {
    // If the box is already clicked or the game is over, do nothing
    if (boxes[index] || gameResult) return;

    // Clone the current state of boxes to update the clicked box
    const updatedBoxes = [...boxes];
    // Set the value of the clicked box based on the current turn (X or O)
    updatedBoxes[index] = xTurn ? "X" : "O";
    // Update the boxes state
    setBoxes(updatedBoxes);
    // Toggle the turn for the next move
    setXTurn(!xTurn);

    // Check if the current move results in a win
    const win = checkWinOrNot(updatedBoxes, xTurn ? "X" : "O");

    // Handle game over conditions
    if (win) {
      gameOver("win", xTurn ? "X" : "O");
    } else if (isGameDraw(updatedBoxes)) {
      gameOver("draw");
    }
  };

  // Function to check if the current move results in a win
  const checkWinOrNot = (currentBoxes, currentSelection) => {
    // Generate an array of winning combinations based on the size
    const winningCombinations = generateWinningCombinations(size);

    // Check if any winning combination is satisfied
    return winningCombinations.some((combination) =>
      combination.every((item) => currentBoxes[item] === currentSelection)
    );
  };

  // Function to check if the game is a draw
  const isGameDraw = (currentBoxes) => {
    // Check if all boxes are filled with either X or O
    return currentBoxes.every((box) => box === "X" || box === "O");
  };

  // Function to generate winning combinations for rows, columns, and diagonals
  const generateWinningCombinations = (size) => {
    const combinations = [];

    // Rows
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(i * size + j);
      }
      combinations.push(row);
    }

    // Columns
    for (let i = 0; i < size; i++) {
      const col = [];
      for (let j = 0; j < size; j++) {
        col.push(j * size + i);
      }
      combinations.push(col);
    }

    // Diagonals
    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < size; i++) {
      diagonal1.push(i * size + i);
      diagonal2.push((size - 1 - i) * size + i);
    }
    combinations.push(diagonal1, diagonal2);

    return combinations;
  };

  // Function to handle game over conditions
  const gameOver = (type, currentSelection) => {
    if (type === "win") {
      setGameResult(`${currentSelection} wins the match`);
    } else {
      setGameResult("Match Draw");
    }
    setRestartVisible(true);
  };

  // Function to restart the game
  const restartGame = () => {
    // Reset the boxes state to an array of size * size filled with empty strings
    setBoxes(Array(size * size).fill(""));
    // Reset the turn to X
    setXTurn(true);
    // Reset the game result
    setGameResult("");
    // Hide the restart button
    setRestartVisible(false);
  };

  // Function to render the Tic-Tac-Toe game
  const renderGame = () => {
    // If size is not a positive integer, display an error message
    if (!Number.isInteger(size) || size <= 0) {
      return (
        <div className="wrapper">
          <div className="gameResult-style" id="gameResult">
            Invalid size. Please provide a positive integer for the grid size.
          </div>
        </div>
      );
    }

    // Render the Tic-Tac-Toe game components
    return (
      <div className="wrapper">
        <div className="gameResult-style" id="gameResult">
          {gameResult}
        </div>
        <div
          className="container"
          id="container"
          style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
        >
          {boxes.map((value, index) => (
            <div key={index} className="box" onClick={() => handleClick(index)}>
              {value}
            </div>
          ))}
        </div>
        <button
          className={`restart-style ${restartVisible ? "show" : ""}`}
          onClick={restartGame}
        >
          Restart Game
        </button>
      </div>
    );
  };

  // Render the Tic-Tac-Toe game
  return renderGame();
};

// Export the App component as the default export
export default App;
