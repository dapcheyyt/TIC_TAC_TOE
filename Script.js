// Minimal Tic Tac Toe logic.

// Cached DOM refs
const statusEl = document.getElementById("status");
const boardEl  = document.getElementById("board");
const cells    = Array.from(document.querySelectorAll(".cell"));
const resetBtn = document.getElementById("reset");

// State
let board = Array(9).fill("");
let current = "X";
let gameOver = false;

// Win lines
const WINS = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

boardEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".cell");
  if (!btn || gameOver) return;

  const i = Number(btn.dataset.index);
  if (board[i]) return;

  board[i] = current;
  btn.textContent = current;
  btn.disabled = true;

  const win = findWin();
  if (win) {
    gameOver = true;
    win.forEach(idx => cells[idx].classList.add("win"));
    statusEl.textContent = `Player ${current} wins! 🎉`;
    disableBoard();
    return;
  }

  if (board.every(Boolean)) {
    gameOver = true;
    statusEl.textContent = "It’s a draw.";
    disableBoard();
    return;
  }

  current = current === "X" ? "O" : "X";
  statusEl.textContent = `Player ${current}’s turn`;
});

resetBtn.addEventListener("click", reset);

function disableBoard() { cells.forEach(c => c.disabled = true); }

function reset() {
  board = Array(9).fill("");
  current = "X";
  gameOver = false;
  statusEl.textContent = "Player X’s turn";
  cells.forEach(c => {
    c.textContent = "";
    c.disabled = false;
    c.classList.remove("win");
  });
}

function findWin() {
  for (const [a,b,c] of WINS) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) return [a,b,c];
  }
  return null;
}
