let board = [];
let timer;
let bombs = 0;
let recursiveCheck = [];

class Board {
   constructor (rows, columns) {
      this.rows = rows;
      this.columns = columns;
   }
   drawEmptyBoard () {
      let boardHTML = "";
      for (let i = 0 ; i < this.rows ; i++) {
         board.push([]);
         for (let j = 0 ; j < this.columns ; j++) {
            board[i].push({
               xPos: i,
               yPos: j,
               value: 0,
               bomb: false,
               clicked: false,
               flagged: false
            });
            boardHTML += `<div class="cell" id="r${i}c${j}"></div>`;
         }
      }
      let $board = $('#board')
      $board.html(boardHTML);
      $board.css({
         'grid-template-columns': `repeat(${this.columns}, 35px)`,
         'grid-template-rows': `repeat(${this.rows}, 35px)`
      })
   }
   dropBombs () {
      let numBombs = bombs = Math.floor(this.columns*this.rows*0.25);
      while (numBombs > 0) {
         let randRow = Math.floor(Math.random() * this.rows);
         let randColumn = Math.floor(Math.random() * this.columns);
         if (board[randRow][randColumn].bomb === false) {
            board[randRow][randColumn].bomb = true;
            $(`#r${randRow}c${randColumn}`).addClass("bomb");;
            numBombs -= 1;
         }
      }
   }
   dropNumbers (row, column) {
      let sum = 0;
      let $cell = $(`#r${row}c${column}`);
      for (let i = row-1 ; i <= row+1 ; i++) {
         if (i === -1 || i === this.rows) continue
         for (let j = column-1 ; j <= column+1 ; j++) {
            if (j === -1 || j === this.columns) continue
            if (board[i][j].bomb) {
               sum += 1;
            }
         }
      }
      if (sum === 0) {
         // board[row][column].value = 0;
         $cell.addClass("empty");
      } else {
         board[row][column].value = sum;
         switch (sum) {
            case 1:
               $cell.addClass("one");
               break;
            case 2:
               $cell.addClass("two");
               break;
            case 3:
               $cell.addClass("three");
               break;
            case 4:
               $cell.addClass("four");
               break;
            case 5:
               $cell.addClass("five");
               break;
            case 6:
               $cell.addClass("six");
               break;
            case 7:
               $cell.addClass("seven");
               break;
            case 8:
               $cell.addClass("eight");
               break;
         }
      }
   }
   create() {
      this.drawEmptyBoard(this.rows, this.columns);
      this.dropBombs();
      for (let i = 0 ; i < this.rows ; i++) {
         for (let j = 0 ; j < this.columns ; j++) {
            if (!board[i][j].bomb) {
               this.dropNumbers(i, j);
            } else {
               board[i][j].value = 10;
            }
         }
      }
   }
}

function checkEmptySpots (row, column) {
   let checkRow, checkColumn;
   let cellDom, cellBoard;
   let lastItemFlag = false;
   for (let i = 1 ; i <= 8 ; i++) {
      switch (i) {
         case 1:  //! (X  , Y-1) - Left
            checkRow = row;
            if (column === 0) {
               checkColumn = column;
            } else {
               checkColumn = column - 1;
            }
            if (board[checkRow][checkColumn].clicked) continue;
            break;
         case 2:  //! (X-1, Y-1) - Left Top Corner
            if (row === 0) {
               checkRow = row;
            } else {
               checkRow = row - 1;
            }
            if (column === 0) {
               checkColumn = column;
            } else {
               checkColumn = column - 1;
            }
            if (board[checkRow][checkColumn].clicked) continue;
            break;
         case 3:  //! (X-1,   Y) - Top
            checkColumn = column;
            if (row === 0) {
               checkRow = row;
            } else {
               checkRow = row - 1;
            }
            if (board[checkRow][checkColumn].clicked) continue;
            break;
         case 4:  //! (X-1, Y+1) - Right Top Corner
            if (row === 0) {
               checkRow = row;
            } else {
               checkRow = row - 1;
            }
            if (column === board[0].length - 1) {
               checkColumn = column;
            } else {
               checkColumn = column + 1;
            }
            if (board[checkRow][checkColumn].clicked) continue;
            break;
         case 5:  //! (X  , Y+1) - Right
            checkRow = row;
            if (column === board[0].length - 1) {
               checkColumn = column;
            } else {
               checkColumn = column + 1;
            }
            if (board[checkRow][checkColumn].clicked) continue;
            break;
         case 6:  //! (X+1, Y+1) - Right Bottom Corner
            if (row === board.length - 1) {
               checkRow = row;
            } else {
               checkRow = row + 1;
            }
            if (column === board[0].length - 1) {
               checkColumn = column;
            } else {
               checkColumn = column + 1;
            }
            if (board[checkRow][checkColumn].clicked) continue;
            break;
         case 7:  //! (X+1,   Y) - Bottom
            checkColumn = column;
            if (row === board.length - 1) {
               checkRow = row;
            } else {
               checkRow = row + 1;
            }
            if (board[checkRow][checkColumn].clicked) continue;
            break;
         case 8:  //! (X+1, Y-1) - Left Bottom Corner
            if (row === board.length - 1) {
               checkRow = row;
            } else {
               checkRow = row + 1;
            }
            if (column === board[0].length - 1) {
               checkColumn = column;
            } else {
               checkColumn = column - 1;
            }
            lastItemFlag = true;
            break;
      }
      if (checkRow >= 0 && checkColumn >= 0 && checkRow < board.length && checkColumn < board[0].length && !board[checkRow][checkColumn].clicked) {
         cellBoard = board[checkRow][checkColumn];
         cellDom = `r${checkRow}c${checkColumn}`;
         if (cellBoard.value === 0) {
            cellBoard.clicked = true;
            document.getElementById(cellDom).classList.add("clicked");
            checkEmptySpots(checkRow, checkColumn);
         } else {
            document.getElementById(cellDom).innerHTML = cellBoard.value;
            cellBoard.clicked = true;
            document.getElementById(cellDom).classList.add("clicked");
            if (lastItemFlag) {
               return;
            }
         }
      }
   }
}

let newBoard = new Board(20, 20);
newBoard.create()

// TODO Still need to block the game before clicking on the set settings
$("#start-btn").click(function () {
   if (timer === undefined) {
      let sec = 0;
      let min = 0;
      let hour = 0;
      $("#start-btn").removeClass("start");
      $("#start-btn").addClass("playing");
      if (bombs < 10) {
         $("#num-bombs p").html(`00${bombs}`);
      } else if (bombs < 100) {
         $("#num-bombs p").html(`0${bombs}`);
      } else {
         $("#num-bombs p").html(bombs);
      }
      timer = setInterval(() => {
         sec += 1;
         if (sec<10) {
            $("#second").text(`0${sec}`);
         } else {
            $("#second").text(sec);
         }
         if (sec === 59){
            sec = 0;
            min += 1;
            if (min<10) {
               $("#minute").text(`0${min}`);
            } else {
               $("#minute").text(min);
            }
         }
         if (min === 59) {
            min = 0;
            hour += 1;
            if (hour<10) {
               $("#hour").text(`0${hour}`);
            } else {
               if (hour > 23) {
                  hour = 0;
               }
               $("#hour").text(hour);
            }
         }
      }, 1000);
   }
});

$(".cell").contextmenu(function(event) {
   event.preventDefault();
   if (bombs > 0) {
      let clickedRow = parseInt(this.id.slice(1,this.id.indexOf("c")));
      let clickedColumn = parseInt(this.id.slice(this.id.indexOf("c")+1,this.id.length));
      let cellBoard = board[clickedRow][clickedColumn];
      let bobmsElement = document.getElementById("num-bombs");
      
      if (!cellBoard.clicked) {
         if (cellBoard.flagged) {
            cellBoard.flagged = false;
            this.classList.remove("flagged");
            bombs += 1;
         } else {
            cellBoard.flagged = true;
            this.classList.add("flagged");
            bombs -= 1;
         }
         if (bombs < 10) {
            bobmsElement.innerHTML = `<p>00${bombs}</p>`;
         } else if (bombs < 100) {
            bobmsElement.innerHTML = `<p>0${bombs}</p>`;
         } else {
            bobmsElement.innerHTML = `<p>${bombs}</p>`;
         }
      }
   }
});

$("#board").on("click", ".cell", function() {
   let clickedRow = parseInt(this.id.slice(1,this.id.indexOf("c")));
   let clickedColumn = parseInt(this.id.slice(this.id.indexOf("c")+1,this.id.length));
   let cellBoard = board[clickedRow][clickedColumn];
   let startButtonElement = document.getElementById("start-btn");
   let cellElement = document.getElementById(`r${clickedRow}c${clickedColumn}`);
   
   if (!cellBoard.flagged && !cellBoard.clicked) {
      if (cellBoard.bomb === true) {
         clearInterval(timer);
         startButtonElement.classList.remove("playing");
         startButtonElement.classList.add("lose");
         cellElement.classList.add("clicked");
         let revealBoard = document.querySelectorAll(".cell");
         let revealRow, revealColumn;

         for (let viewCell of revealBoard) {
            revealRow = parseInt(viewCell.id.slice(1, viewCell.id.indexOf("c")));
            revealColumn = parseInt(viewCell.id.slice(viewCell.id.indexOf("c")+1,viewCell.id.length));
            cellBoard = board[revealRow][revealColumn];
            viewCell.innerHTML = cellBoard.value;
            if (cellBoard.bomb) {
               if (!viewCell.classList.contains("clicked")) {
                  viewCell.classList.add("clicked")
                  viewCell.classList.add("reveal");
                  cellBoard.clicked = true;
               } else {
                  viewCell.classList.add("clicked");
                  cellBoard.clicked = true;
               }
            } else {
               viewCell.classList.add("clicked");
               cellBoard.clicked = true;
            }
         }
      } else if (!cellBoard.clicked && cellBoard.value != 0) {
         cellElement.innerHTML = cellBoard.value; 
         cellElement.classList.add("clicked");
         cellBoard.clicked = true; 
      } else {
         checkEmptySpots(clickedRow, clickedColumn);
      }
   }
});

