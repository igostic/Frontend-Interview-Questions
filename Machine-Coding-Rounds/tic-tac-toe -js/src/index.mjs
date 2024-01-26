import "./styles.css";

const container = document.getElementById("container");
const gameResult = document.getElementById("gameResult");
const restart = document.getElementById("restart");
let xTurn = true;
let boxes;
// render boxes dynamically
startGame("");
restart.addEventListener("click", () => startGame("restart"));

function startGame(type) {
  let box;
  for (let i = 0; i < 9; i++) {
    if (type === "restart") {
      resetValues(i);
    } else {
      box = document.createElement("div");
      box.classList.add("box");
      container.appendChild(box);
    }
    // once true because i want one box to be clicked once only
    // box.addEventListener("click", handleClick, { once: true });

    // needed for restart case because box will not be present
    (box || boxes[i]).addEventListener("click", handleClick, { once: true });
  }
}

boxes = document.querySelectorAll(".box");

function handleClick(e) {
  const currentBox = e.target;
  if (xTurn) {
    currentBox.innerText = "X";
    xTurn = false;
  } else {
    currentBox.innerText = "O";
    xTurn = true;
  }

  const currentSelection = currentBox.innerText;
  const win = checkWinOrNot(currentSelection);

  if (win) {
    gameOver("win", currentSelection);
  } else if (isGameDraw()) {
    gameOver("draw", currentSelection);
  }
}

// winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function checkWinOrNot(currentSelection) {
  return winningCombinations.some((combination) => {
    return combination.every(
      (item) => boxes[item].innerText === currentSelection,
    );
  });
}

function gameOver(type, currentSelection) {
  if (type === "win") {
    gameResult.innerText = currentSelection + " wins the match";
  } else {
    gameResult.innerText = "Match Draw";
  }
  container.style.pointerEvents = "none";
  restart.classList.add("show");
}

function isGameDraw() {
  // iterate through each boxes and
  // each box have innerText of X or O
  // boxes is a nodeList to need to convert
  // it to array
  return [...boxes].every(
    (box) => box.innerText === "X" || box.innerText === "O",
  );
}

function resetValues(idx) {
  // unset needed because we have
  // settled once as true otherwise
  // we won't be able to click on board
  container.style.pointerEvents = "unset";
  boxes[idx].removeEventListener("click", handleClick);
  boxes[idx].innerText = "";
  gameResult.innerText = "";
  xTurn = true;
  restart.classList.remove("show");
}
