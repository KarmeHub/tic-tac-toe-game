const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
let players = ['X', 'O'];
let turn = 0;

function printBoard() {
  for (let i = 0; i < 3; i++) {
    console.log(board[i].join('|'));
    if (i < 2) {
      console.log('-'.repeat(5));
    }
  }
}

function checkWinner(player) {
  // Check rows, columns, and diagonals
  for (let i = 0; i < 3; i++) {
    if ((board[i][0] === player && board[i][1] === player && board[i][2] === player) ||
        (board[0][i] === player && board[1][i] === player && board[2][i] === player)) {
      return true;
    }
  }

  if ((board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
      (board[0][2] === player && board[1][1] === player && board[2][0] === player)) {
    return true;
  }

  return false;
}

function isBoardFull() {
  return board.every(row => row.every(cell => cell !== ' '));
}

function ticTacToe() {
  printBoard();
  rl.question(`Player ${players[turn % 2]}'s turn. Enter row and column (e.g., 0 0): `, (input) => {
    const [row, col] = input.split(' ').map(val => parseInt(val));

    if (isNaN(row) || isNaN(col) || row < 0 || row > 2 || col < 0 || col > 2) {
      console.log("Invalid input! Row and column must be between 0 and 2.");
      ticTacToe();
      return;
    }

    if (board[row][col] !== ' ') {
      console.log("That cell is already taken!");
      ticTacToe();
      return;
    }

    board[row][col] = players[turn % 2];

    if (checkWinner(players[turn % 2])) {
      printBoard();
      console.log(`Player ${players[turn % 2]} wins!`);
      rl.close();
      return;
    }

    if (isBoardFull()) {
      printBoard();
      console.log("It's a tie!");
      rl.close();
      return;
    }

    turn++;
    ticTacToe();
  });
}

ticTacToe();
