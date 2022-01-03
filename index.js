'use strict';
let match = false; //state variable
let playerX = true; // true if it is player X's turn
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

//returns true if there is a match across any of the 3 rows else returns false
const check_rows = function () {
  let r = 0;
  while (r < 3) {
    let c = 0;
    if (!board[r][c]) return false;
    if (board[r][c] === board[r][c + 1]) {
      if (board[r][c + 1] === board[r][c + 2]) {
        // if there is a match , mark them in red
        document.querySelector(`#space${conv(r, c)}`).style.color = 'red';
        document.querySelector(`#space${conv(r, c + 1)}`).style.color = 'red';
        document.querySelector(`#space${conv(r, c + 2)}`).style.color = 'red';
        return true;
      }
    }
    r++;
  }
  return false;
};

//returns true if there is a match across any of the 3 columns else returns false
const check_cols = function () {
  let c = 0;
  while (c < 3) {
    let r = 0;
    if (!board[r][c]) return false;
    if (board[r][c] === board[r + 1][c]) {
      if (board[r + 1][c] === board[r + 2][c]) {
        // if there is a match , mark them in red
        document.querySelector(`#space${conv(r, c)}`).style.color = 'red';
        document.querySelector(`#space${conv(r + 1, c)}`).style.color = 'red';
        document.querySelector(`#space${conv(r + 2, c)}`).style.color = 'red';
        return true;
      }
    }
    c++;
  }
  return false;
};

//returns true if there is a match across diagonals else returns false
const check_diag = function () {
  //check left diagonal
  if (board[0][0] && board[0][0] === board[1][1]) {
    if (board[1][1] === board[2][2]) {
      document.querySelector(`#space${conv(0, 0)}`).style.color = 'red';
      document.querySelector(`#space${conv(1, 1)}`).style.color = 'red';
      document.querySelector(`#space${conv(2, 2)}`).style.color = 'red';
      return true;
    }
  }

  //check right diagonal
  if (board[0][2] && board[0][2] === board[1][1]) {
    if (board[1][1] === board[2][0]) {
      document.querySelector(`#space${conv(0, 2)}`).style.color = 'red';
      document.querySelector(`#space${conv(1, 1)}`).style.color = 'red';
      document.querySelector(`#space${conv(2, 0)}`).style.color = 'red';
      return true;
    }
  }
  return false;
};

//converts row,col value of any matrix cell to the id number associated with it
const conv = function (row, col) {
  if (col === 0) return 1 + 3 * row;
  else if (col === 1) return 2 + 3 * row;
  else return 3 + 3 * row;
};

//driver function when a player plays his turn. Takes matrix cell x,y indexes and the id number of the matrix cell as arguments
const eventDriver = function (r, c, boxNum) {
  let elem = document.querySelector(`#space${boxNum}`);

  if (!match) {
    // if there hasnt been a pattern match yet
    if (!elem.textContent) {
      //if the cell clicked to is empty
      if (playerX) {
        //if it is player X's turn
        elem.textContent = 'X';
        board[r][c] = 'X';
      } else {
        // if it is player O's turn
        elem.textContent = 'O';
        board[r][c] = 'O';
      }
      playerX = !playerX; //update to next player's turn
    }
    // check for any possible pattern matches each time a player gives a turn and update the state variable
    match = check_cols() || check_rows() || check_diag();
  }
};

// Below are the event listener methods that listen for a mouse click in any of the 9 cells of the tic-tac-toe matrix and call the event handler function
document.querySelector('#box1').addEventListener('click', function () {
  eventDriver(0, 0, 1);
});

document.querySelector('#box2').addEventListener('click', function () {
  eventDriver(0, 1, 2);
});

document.querySelector('#box3').addEventListener('click', function () {
  eventDriver(0, 2, 3);
});

document.querySelector('#box4').addEventListener('click', function () {
  eventDriver(1, 0, 4);
});

document.querySelector('#box5').addEventListener('click', function () {
  eventDriver(1, 1, 5);
});

document.querySelector('#box6').addEventListener('click', function () {
  eventDriver(1, 2, 6);
});

document.querySelector('#box7').addEventListener('click', function () {
  eventDriver(2, 0, 7);
});

document.querySelector('#box8').addEventListener('click', function () {
  eventDriver(2, 1, 8);
});

document.querySelector('#box9').addEventListener('click', function () {
  eventDriver(2, 2, 9);
});
