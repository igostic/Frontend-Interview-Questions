import "./styles.css";

import React, { useState } from "react";

const App = () => {
  const [xTurn, setXTurn] = useState(true);
  const [gameResult, setGameResult] = useState("");
  const [restartVisible, setRestartVisible] = useState(false);
  const [boxes, setBoxes] = useState(Array(9).fill(""));

  const handleClick = (index) => {
    if (boxes[index] || gameResult) return; // If box is already clicked or game is over

    const updatedBoxes = [...boxes];
    updatedBoxes[index] = xTurn ? "X" : "O";
    setBoxes(updatedBoxes);
    setXTurn(!xTurn);

    const win = checkWinOrNot(updatedBoxes, xTurn ? "X" : "O");

    if (win) {
      gameOver("win", xTurn ? "X" : "O");
    } else if (isGameDraw(updatedBoxes)) {
      gameOver("draw");
    }
  };

  const checkWinOrNot = (currentBoxes, currentSelection) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winningCombinations.some((combination) =>
      combination.every((item) => currentBoxes[item] === currentSelection),
    );
  };

  const isGameDraw = (currentBoxes) => {
    return currentBoxes.every((box) => box === "X" || box === "O");
  };

  const gameOver = (type, currentSelection) => {
    if (type === "win") {
      setGameResult(`${currentSelection} wins the match`);
    } else {
      setGameResult("Match Draw");
    }
    setRestartVisible(true);
  };

  const restartGame = () => {
    setBoxes(Array(9).fill(""));
    setXTurn(true);
    setGameResult("");
    setRestartVisible(false);
  };

  return (
    <div className="wrapper">
      <div className="gameResult-style" id="gameResult">
        {gameResult}
      </div>
      <div className="container" id="container">
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

export default App;
