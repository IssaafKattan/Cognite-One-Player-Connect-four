

// set up variables

const empty = '0';
const player1 = '1';
const player2 = '2';
const win = '3';
drop = new sound("./public/drop.wav");
won = new sound("./public/win.wav");

var winner = empty;
var gameOver = false;
var currentPlayer = player1;
var map = [
	[empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty]
];

// Load initial
loadMap();

// Loads the main map
function loadMap() {

	if (gameOver) {
         resetMap();
		 if (currentPlayer === player1)
         document.getElementById('winner').innerHTML = "<h1 class='big-text player" + player1 + " '>YAAAY, You won you genuis!!</h1>"
         else  document.getElementById('winner').innerHTML = "<h1 class='big-text player" + player2 + "' >Ooopps...our not so inteligent AI won....</h1>"

         document.getElementById('game').innerHTML = "<button class='start-game' onclick='startOver()'>Start Over</button>";

	} else {
        document.getElementById('winner').innerHTML = "<h1 class='big-text'>Your move... </h1>"

		// Initialize buttons & set color based on current player
		for (let row = 0; row < 7; row++) {
			document.getElementById('game').innerHTML += "<button class='insert-button player" + currentPlayer + " ' onclick='placeDot(" + row + ")'></button>";

		}
		// New line
		document.getElementById('game').innerHTML += "<br />";


		// Draw slots
		for (let i = 0; i < map.length; i++) {
            
			for (let j = 0; j < map[i].length; j++) {
				// Slot is empty
				if (map[i][j] === empty) {
					document.getElementById('game').innerHTML += "<span onclick='placeDot(" + j + ")' class=empty-dot></span>";
				}
				// Slot is filled by player 1
				if (map[i][j] === player1) {
					document.getElementById('game').innerHTML += "<span class='filled-dot yellow'></span>";
				}

				// Slot is filled by player 2
				if (map[i][j] === player2) {
					document.getElementById('game').innerHTML += "<span class='filled-dot pink'></span>";
				}
				// If someone has won cross out winning slots   
				else if (map[i][j] === win) {
					if (winner == player1)
						document.getElementById('game').innerHTML += "<span class='filled-dot yellow win'></span>";
					else
						document.getElementById('game').innerHTML += "<span class='filled-dot pink win'></span>";
                        gameOver = true;
                        won.play();


				}
			}
            document.getElementById('game').innerHTML += "<br />";
		}
	}
}

function updateMap() {
		
	
	// Check if anyone won
	
	let gameWon = checkMap();
if(gameWon === empty){
	// Swap current player
	if (currentPlayer === player1) {
		currentPlayer = player2;
        //  plan move
		let possibleMoves = think();
		var cpuMove = Math.floor( Math.random() * possibleMoves.length);
		currentCol = possibleMoves[cpuMove];
		// Make move
		placeDot(currentCol);

			// Clear everything
	document.getElementById('game').innerHTML = "";
	loadMap();


    } else {
		currentPlayer = player1;
    
	// Clear everything
	document.getElementById('game').innerHTML = "";
	loadMap();

	}
}
else {
	document.getElementById('game').innerHTML = "";
	loadMap();
}
    
}

function placeDot(row) {

	for (let i = map.length - 1; i >= 0; i--) {
		console.log('inserting at',i, row)
		if (map[i][row] === empty) {
			map[i][row] = currentPlayer;

           drop.play();
			return updateMap();
		}
	}

  alert("This row is full... try another?")
}

function checkMap() {
	// Check down
	for (row = 0; row < 3; row++)
		for (col = 0; col < 7; col++)
			if (checkLine(map[row][col], map[row + 1][col], map[row + 2][col], map[row + 3][col])) {
				winner = map[row][col];

				map[row][col] = win;
				map[row + 1][col] = win;
				map[row + 2][col] = win;
                map[row + 3][col] = win;

				return 1;
			}

	// Check right
	for (row = 0; row < 6; row++)
		for (col = 0; col < 4;col++)
			if (checkLine(map[row][col], map[row][col + 1], map[row][col + 2], map[row][col + 3])) {
				winner = map[row][col];
				map[row][col] = win;
				map[row][col + 1] = win;
				map[row][col + 2] = win;
                map[row][col + 3] = win;

				return 1;

			}

	// Check down-right
	for (row = 0; row < 3;row++)
		for (col = 0;col < 4; col++)
			if (checkLine(map[row][col], map[row + 1][col + 1], map[row + 2][col + 2], map[row + 3][col + 3])) {
				winner = map[row][col];

				map[row][col] = win;
				map[row + 1][col + 1] = win;
				map[row + 2][col + 2] = win;
                map[row + 3][col + 3] = win;

				return 1;

			}


	// Check down-left
	for (row = 3; row < 6; row++)
		for (col = 0; col < 4; col++)
			if (checkLine(map[row][col], map[row - 1][col + 1], map[row - 2][col+ 2], map[row - 3][col + 3])) {
				winner = map[row][col];

				map[row][col] = win;
				map[row - 1][col + 1] = win;
				map[row - 2][col + 2] = win;
                map[row - 3][col + 3] = win;

				return 1;
			}

	return empty;
}

function checkLine(a, b, c, d) {
	// Check if first cell non-zero and all cells match
	return ((a != empty) && (a == b) && (a == c) && (a == d));
}

function resetMap() {
	map = [
		[empty, empty, empty, empty, empty, empty, empty],
		[empty, empty, empty, empty, empty, empty, empty],
		[empty, empty, empty, empty, empty, empty, empty],
		[empty, empty, empty, empty, empty, empty, empty],
		[empty, empty, empty, empty, empty, empty, empty],
		[empty, empty, empty, empty, empty, empty, empty]

	];
}

function startOver(){
    document.getElementById('game').innerHTML = "";
   gameOver= false;
   currentPlayer = player1;
   winner = empty;
    resetMap();
    loadMap();

}




// For sound effects

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
} 


// AI decides next move

function think(){
	var possibleMoves = possibleColumns();
	var aiMoves = new Array();
	var blocked;
	var bestBlocked = 0;
	
	for(var i=0; i<possibleMoves.length; i++){
	  for(var j=0; j<6; j++){
		if(map[j][possibleMoves[i]] != 0){
		  break;
		}
	  }
	  
	  map[j-1][possibleMoves[i]] = player2;
	  blocked = getAdj(j-1,possibleMoves[i],0,1)+getAdj(j-1,possibleMoves[i],0,-1);
	  blocked = Math.max(blocked,getAdj(j-1,possibleMoves[i],1,0));
	  blocked = Math.max(blocked,getAdj(j-1,possibleMoves[i],-1,1));
	  blocked = Math.max(blocked,getAdj(j-1,possibleMoves[i],1,1)+getAdj(j-1, possibleMoves[i],-1,-1));
	  
	  if(blocked >= bestBlocked){
		if(blocked>bestBlocked){
		  bestBlocked = blocked;
		  aiMoves = new Array();
		}
		aiMoves.push(possibleMoves[i]);
	  }
	  map[j-1][possibleMoves[i]] = empty;
	}
	
	return aiMoves;
  }


    // returns all possible values
  function possibleColumns(){
	var moves_array = new Array();
	for(var i=0; i<7; i++){
	  if(map[0][i] == empty){
		moves_array.push(i);
	  }
	}
	return moves_array;
  }

  function getAdj(row,col,row_inc,col_inc){
	if(cellVal(row,col) == cellVal(row+row_inc,col+col_inc)){
	  return 1+getAdj(row+row_inc,col+col_inc,row_inc,col_inc);
	} else {
	  return 0;
	}
  }


function cellVal(row,col){
	if(map[row] == undefined || map[row][col] == undefined){
	  return -1;
	} else {
	  return map[row][col];
	}
  }


  // checks if the whole map is full to start game over
  function isMapFull(){
	  let isFull = true;
	  for(let i=0; i< map.length;i++){
		  for(let j=0; j<map[i].length; j++){
			  if(map[i][j] === empty)
			  isFull = false;
 		}
	  }
	  if(isFull){
// Start game over
		  startOver();
	  }
  }