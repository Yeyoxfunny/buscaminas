
var gameBoard;

var ROWS_NUMBER = 10;
var COLS_NUMBER = 10;
var CELL_WIDTH = 50;
var TOTAL_MINES = 20;

function setup() {
   var canvas = createCanvas(ROWS_NUMBER * CELL_WIDTH + 1, COLS_NUMBER * CELL_WIDTH + 1);
   canvas.parent("game-board");
   //ROWS_NUMBER = floor(height / CELL_WIDTH);
   //COLS_NUMBER = floor(width / CELL_WIDTH);
   startGame();
}

function startGame() {
   gameBoard = createEmptyGameBoard(ROWS_NUMBER, COLS_NUMBER);
   generateRandomMines();
   countNeighboringMines();
}

function createEmptyGameBoard(rows, columns) {
   var grid = generateMatrix(rows, columns);
   for (var i = 0; i < rows; i++) {
      for (var j = 0; j < columns; j++) {
         grid[i][j] = new Cell(i, j, CELL_WIDTH);
      }
   }
   return grid;
}

function generateMatrix(rows, columns) {
   var matrix = new Array(rows);
   for (var i = 0; i < rows; i++) {
      matrix[i] = new Array(columns);
   }
   return matrix;
}

function generateRandomMines() {
   var positions = getAllBoardPositions();
   for (var n = 1; n <= TOTAL_MINES; n++) {
      var index = floor(random(positions.length));
      var choice = positions[index];
      var i = choice[0];
      var j = choice[1];
      // Delete current choice position from positions array
      positions.splice(index, 1);
      gameBoard[i][j].hasAMine = true;
   }
}

function getAllBoardPositions() {
   var positions = [];
   for (var i = 0; i < ROWS_NUMBER; i++) {
      for (var j = 0; j < COLS_NUMBER; j++) {
         positions.push([i, j]);
      }
   }
   return positions;
}

function countNeighboringMines() {
   for (var i = 0; i < ROWS_NUMBER; i++) {
      for (var j = 0; j < COLS_NUMBER; j++) {
         gameBoard[i][j].countNeighboringMines();
      }
   }
}

function draw() {
   background(255);
   for (var i = 0; i < ROWS_NUMBER; i++) {
      for (var j = 0; j < COLS_NUMBER; j++) {
         gameBoard[i][j].show();
      }
   }
}

function mousePressed() {
   for (var i = 0; i < ROWS_NUMBER; i++) {
      for (var j = 0; j < COLS_NUMBER; j++) {
         if (gameBoard[i][j].containsPosition(mouseX, mouseY)) {
            gameBoard[i][j].reveal();
            if (gameBoard[i][j].hasAMine) {
               gameOver();
            }
         }
      }
   }
}

function gameOver() {
   for (var i = 0; i < ROWS_NUMBER; i++) {
      for (var j = 0; j < COLS_NUMBER; j++) {
         gameBoard[i][j].revealed = true;
      }
   }
}
