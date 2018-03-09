
function Cell(rowIndex, colIndex, width) {
   this.rowIndex = rowIndex;
   this.colIndex = colIndex;
   this.x = calculatePixelLocation(rowIndex, width);
   this.y = calculatePixelLocation(colIndex, width);
   this.width = width;
   this.hasAMine = false;
   this.revealed = false;
   this.numberOfNeighboringMines = 0;
}

Cell.prototype.show = function() {
   stroke(0);
   noFill();
   rect(this.x, this.y, this.width, this.width);
   if (this.revealed) {
      if (this.hasAMine) {
         fill(127);
         ellipse(this.centerPosition(this.x), this.centerPosition(this.y), this.width * 0.5);
      } else {
         fill(200);
         rect(this.x, this.y, this.width, this.width);
         if (this.numberOfNeighboringMines > 0) {
            textAlign(CENTER);
            fill(0);
            text(this.numberOfNeighboringMines, this.centerPosition(this.x), this.centerPosition(this.y));
         }
      }
   }
}

Cell.prototype.centerPosition = function(position) {
   return position + (this.width / 2);
}

Cell.prototype.countNeighboringMines = function() {
   if (this.hasAMine) {
      this.numberOfNeighboringMines = -1;
      return;
   }
   var total = 0;
   for (var xOffset = -1; xOffset <= 1; xOffset++) {
      for (var yOffset = -1; yOffset <= 1; yOffset++) {
         var i = this.rowIndex + xOffset;
         var j = this.colIndex + yOffset;
         if (this.positionDoesNotOverflowTheBoard(i, j)) {
            var neighbour = gameBoard[i][j];
            if (neighbour.hasAMine) {
               total++;
            }
         }
      }
   }
   this.numberOfNeighboringMines = total;
}

Cell.prototype.positionDoesNotOverflowTheBoard = function(i, j) {
   return (i > -1 && i < ROWS_NUMBER && j > -1 && j < COLS_NUMBER);
}

Cell.prototype.containsPosition = function(x, y) {
   return (x > this.x && x < (this.x + this.width)) && 
         (y > this.y && y < (this.y + this.width));
}

Cell.prototype.reveal = function() {
   this.revealed = true;
   if (this.numberOfNeighboringMines == 0) {
      this.floodFill();
   }
}

// Flood Fill Algorithm
Cell.prototype.floodFill = function() {
   for (var xOffset = -1; xOffset <= 1; xOffset++) {
      for (var yOffset = -1; yOffset <= 1; yOffset++) {
         var i = this.rowIndex + xOffset;
         var j = this.colIndex + yOffset;
         if (this.positionDoesNotOverflowTheBoard(i, j)) {
            var neighbour = gameBoard[i][j];
            if (!neighbour.revealed) {
               neighbour.reveal();
            }
         }
      }
   }
}

function calculatePixelLocation(index, width) {
   return index * width;
}