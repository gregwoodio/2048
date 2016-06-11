/*
2048 by Greg Wood
June 6 2016
*/

var board = [];
var size = 4;

function moveUp() {
	if (canMoveUp()) {
		for (i = 1; i < board.length; i++) {
			for (j = 0; j < board[i].length; j++) {
				shiftUp(i,j);
			}
		}
		nextMove();
		display();
	}
}

function shiftUp(i, j) {
	if (i - 1 >= 0) {
		if (board[i-1][j] == board[i][j]) {
			//match, add them
			board[i-1][j] = board[i][j] * 2;
			board[i][j] = 0;
			//shiftUp(i-1, j);
		} else if (board[i-1][j] == 0) {
			//slide into empty spot
			board[i-1][j] = board[i][j];
			board[i][j] = 0;
			//and keep sliding
			shiftUp(i-1, j);
		}
	}
}

function moveDown() {
	if (canMoveDown()) {
		for (i = size - 2; i >= 0; i--) {
			for (j = 0; j < board[i].length; j++) {
				shiftDown(i,j);
			}
		}
		nextMove();
		display();
	}
}

function shiftDown(i, j) {
	if (i + 1 <= size - 1) {
		if (board[i+1][j] == board[i][j]) {
			//match, add them
			board[i+1][j] = board[i][j] * 2;
			board[i][j] = 0;
			//shiftDown(i+1, j);
		} else if (board[i+1][j] == 0) {
			//slide into empty spot
			board[i+1][j] = board[i][j];
			board[i][j] = 0;
			//and keep sliding
			shiftDown(i+1, j);
		}
	}
}

function moveLeft() {
	if (canMoveLeft()) {
		for (i = 0; i < board.length; i++) {
			for (j = 1; j < board[i].length; j++) {
				shiftLeft(i,j);
			}
		}
		nextMove();
		display();
	}
}

function shiftLeft(i, j) {
	if (j - 1 >= 0) {
		if (board[i][j-1] == board[i][j]) {
			//match, add them
			board[i][j-1] = board[i][j] * 2;
			board[i][j] = 0;
			//keep sliding
			//shiftLeft(i, j-1);
		} else if (board[i][j-1] == 0) {
			//slide into empty spot
			board[i][j-1] = board[i][j];
			board[i][j] = 0;
			//and keep sliding
			if (j-1 >= 0) {
				shiftLeft(i, j-1);
			} else {
				return;
			}
		}
	}
}

function moveRight() {
	if (canMoveRight()) {
		for (i = 0; i < board.length; i++) {
			for (j = board.length - 2; j >= 0; j--) {
				shiftRight(i,j);
			}
		}
		nextMove();
		display();
	}
}

function shiftRight(i, j) {
	if (j + 1 <= size - 1) {
		if (board[i][j+1] == board[i][j]) {
			//match, add them
			board[i][j+1] = board[i][j] * 2;
			board[i][j] = 0;
			//shiftRight(i, j+1);
		} else if (board[i][j+1] == 0) {
			//slide into empty spot
			board[i][j+1] = board[i][j];
			board[i][j] = 0;
			//and keep sliding
			shiftRight(i, j+1);
		}
	}
}

function display() {
	for (i = 0; i < board.length; i++) {
		for (j = 0; j < board[i].length; j++) {
			if (board[i][j] != 0) {
				document.getElementById("square" + i + j).innerHTML = board[i][j];
				document.getElementById("square" + i + j).className = "score" + board[i][j];
			} else {
				document.getElementById("square" + i + j).innerHTML = "";
				document.getElementById("square" + i + j).className = "";
			}
		}
	}

	document.getElementById("score").innerHTML = calcScore();
}

function nextMove() {
	//find empty spaces
	var spaces = [];
	for (i = 0; i < board.length; i++) {
		for (j = 0; j < board.length; j++) {
			if (board[i][j] == 0) {
				spaces.push([i,j]);
			}
		}
	}

	if (spaces.length > 0) {
		//pick one to add a 1 to
		var space = spaces[Math.floor(Math.random() * spaces.length)];
		board[space[0]][space[1]] = 1;
	}
	checkLose();
}

function checkLose() {
	if (!(canMoveUp() || canMoveDown() || canMoveRight() || canMoveLeft())) {
		alert("Game over! You scored " + calcScore());
		if (confirm("Play again?")) {
			resetGame();
		}
		return true;
	}
	return false;
}

//keyboard controls 
document.addEventListener('keydown', function(event) {
    if (event.keyCode == 37) {
        moveLeft();

    }
    else if (event.keyCode == 39) {
        moveRight();
    }
    
    else if (event.keyCode == 38) {
        moveUp();
    }
    
    else if (event.keyCode == 40) {
        moveDown();
    }
});

function calcScore() {
	score = 0;
	for (i = 0; i < board.length; i++) {
		for (j = 0; j < board[i].length; j++) {
			score += board[i][j];
		}
	}

	return score;
}

//functions for checking if a move can be made
function canMoveUp() {
	for (i = board.length - 1; i >= 0; i--) {
		passedNumber = false;
		for (j = board[i].length - 1; j >= 0; j--) {
			if (j + 1 < board.length) {
				if (board[j][i] == board[j + 1][i] && board[j][i] !== 0) {
					return true;
				}
			}

			if (board[j][i] != 0) {
				passedNumber = true;
			} else if (board[j][i] == 0 && passedNumber) {
				return true;
			}
		}	
	}
	return false;
}

function canMoveDown() {
	for (i = 0; i < board.length; i++) {
		passedNumber = false;
		for (j = 0; j < board[i].length; j++) {
			
			if (j - 1 >= 0) {
				if (board[j][i] == board[j - 1][i] && board[j][i] !== 0) {
					return true;
				}
			}
			if (board[j][i] != 0) {
				passedNumber = true;
			} else if (board[j][i] == 0 && passedNumber) {
				return true;
			}
		}
	}
	return false;
}

function canMoveLeft() {
	for (i = board.length - 1; i >= 0; i--) {
		passedNumber = false;
		for (j = board[i].length - 1; j >= 0; j--) {
			if (j + 1 < board.length) {
				if (board[i][j] == board[i][j + 1] && board[i][j] !== 0) {
					return true;
				}
			}

			if (board[i][j] != 0) {
				passedNumber = true;
			} else if (board[i][j] == 0 && passedNumber) {
				return true;
			}
		}	
	}
	return false;
}

function canMoveRight() {
	for (i = 0; i < board.length; i++) {
		passedNumber = false;
		for (j = 0; j < board[i].length; j++) {
			
			if (j - 1 >= 0) {
				if (board[i][j] == board[i][j - 1] && board[i][j] !== 0) {
					return true;
				}
			}
			if (board[i][j] != 0) {
				passedNumber = true;
			} else if (board[i][j] == 0 && passedNumber) {
				return true;
			}
		}
	}
	return false;
}

function resetGame() {
	//size = parseInt(document.getElementById("size").value);
	size = 4;

	//create board
	board = [];
	var string = "";
	for (i = 0; i < size; i++) {
		string += "<tr>";
		board.push([]);
		for (j = 0; j < size; j++) {
			string += "<td id=\"square" + i + "" + j + "\"></td>";
			board[i].push(0);
			
		}
		string += "</tr>";
	}
	document.getElementById("board").innerHTML = string;

	//set some numbers as 1s
	board[Math.floor(Math.random() * size)][Math.floor(Math.random() * size)] = 1;
	board[Math.floor(Math.random() * size)][Math.floor(Math.random() * size)] = 1;

	display();
}

resetGame();