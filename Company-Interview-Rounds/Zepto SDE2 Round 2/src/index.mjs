import "./styles.css";

const board = document.getElementById("board");
const resetButton = document.getElementById("btn_restart");
const gameStatus = document.getElementsByClassName("status");

let currentPlayer = 'X';

let gameBoard = ['','',''];
let gameActive = true;

function renderBoard () {
  for(let i = 0; i < 9; i++){
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => handleClick(i));
    board.appendChild(cell);
  }
}
renderBoard();
function checkWinner() {
  // main logic 
  const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for(let patt of winPatterns){
    const [a,b,c] = patt;
    if(gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameActive = false;
      gameStatus.textContent = `Player ${currentPlayer} wins`;
      return true;
    }
  }

  // draw case
  if(!gameBoard.includes("")){
    gameActive = false;
    gameStatus.textContent = "It's a draw";
    return true;
  }

  return false;
}
function handleClick(idx) {
  if(gameBoard[idx] === "" && gameActive){
    gameBoard[idx] = currentPlayer;
    console.log(gameBoard);
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = currentPlayer;
    if(board.querySelector(`[data-index='${idx}']`))
    board.querySelector(`[data-index='${idx}']`).appendChild(cell);
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if(!checkWinner()){
      gameStatus.textContent = `Player ${currentPlayer} turns`
    }
  }
}

function resetButtonhandler() {
  gameBoard = ['','',''];
  board.innerHTML = "";
  gameStatus.textContent = "";
  currentPlayer = 'X';
}

board.addEventListener('click', (e) => {
  if(e.target.classList.contains('cell')){
    // find the idx from array
    // handle that clicked index
    let idx = Array.from(board.children).indexOf(e.target)
    handleClick(idx);
  }
})

resetButton.addEventListener('click', resetButtonhandler);