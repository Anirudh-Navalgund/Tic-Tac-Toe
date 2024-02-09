
var board;
var playerO = "O";
var playerX = "X";
var curPlayer = playerO;
var gameOver = false;

window.onload = function() {
  setGame();
}

function setGame() {
  board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];

  for (let r=0; r<3; r++) {
    for (let c=0; c<3; c++) {
      // <div id="0-0"></div>
      let tile = document.createElement("div");  // creates div
      tile.id = r.toString() + "-" + c.toString(); // assigns it an id
      tile.classList.add("tile"); // gives it class - tile

      if (r==0 || r==1) {
        tile.classList.add("horizontal-line");
      }
      if (c==0 || c==1) {
        tile.classList.add("vertical-line");
      }

      tile.addEventListener("click", setTile); 
      document.getElementById("board").append(tile); // adds to the HTML file
    }
  }
}

function setTile() {
  if (gameOver) {
    return; // no tile is clickable
  }

  let coordinates = this.id.split("-"); //"1-1 -> ['1', '1']"
  let r = parseInt(coordinates[0]);
  let c = parseInt(coordinates[1]);

  if (board[r][c] != ' ') {
    // already taken spot
    return;
  }

  board[r][c] = curPlayer;
  this.innerText = curPlayer;

  // TO ALTERNATE THE PLAYERS
  if (curPlayer == playerO) {
    curPlayer = playerX;
  }
  else {
    curPlayer = playerO;
  }

  checkWinner();
}

function checkWinner() {
  // check horizontally
  for (let r=0; r<3; r++) {
    if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0]!=' ') {
      for (let i=0; i<3; i++) {
        let tile = document.getElementById(r.toString() + "-" + i.toString());
        tile.classList.add("winner");
      }
      let winner = (curPlayer == playerO) ? playerX : playerO;
      document.getElementById("winner").innerText = winner;
      gameOver = true;
      return;
    }
  }

  // check vertically
  for (let c=0; c<3; c++) {
    if (board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c]!=' ') {
      for (let i=0; i<3; i++) {
        let tile = document.getElementById(i.toString() + "-" + c.toString());
        tile.classList.add("winner");
      }
      let winner = (curPlayer == playerO) ? playerX : playerO;
      document.getElementById("winner").innerText = winner;
      gameOver = true;
      return;
    }
  }

  // check diagonally
  if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0]!=' ') {
    for (let i=0; i<3; i++) {
      let tile = document.getElementById(i.toString() + "-" + i.toString());
      tile.classList.add("winner");
    }
    let winner = (curPlayer == playerO) ? playerX : playerO;
      document.getElementById("winner").innerText = winner;
    gameOver = true;
    return;
  }
  
  // check anti-diagonally
  if (board[0][2] == board[1][1] && board[2][0] ==board[1][1] && board[0][2]!=' ') {
    //0-2
    let tile = document.getElementById("0-2");
    tile.classList.add("winner");

    tile = document.getElementById("1-1");
    tile.classList.add("winner");

    tile = document.getElementById("2-0");
    tile.classList.add("winner");

    let winner = (curPlayer == playerO) ? playerX : playerO;
    document.getElementById("winner").innerText = winner;
    
    gameOver = true;
    return;
  }
}

function resetGame() {
  /* Reset the tic-tac-toe board and restart a new game */
  board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      tile.innerText = ' ';
      tile.classList.remove("winner");
      let win = document.getElementById("winner");
      win.innerText = '';
      win.classList.remove("winner");
    }
  }
  // Reset the game state
  gameOver = false;
  curPlayer = playerO;
}
