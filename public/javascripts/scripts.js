console.log(":-)")



//document ready
$(function(){
	if (document.location.pathname == "/games/hangman") {
		hangmanLetterGuess();
	}

	$canvas = $('#tictac_board');
	context = $canvas[0].getContext('2d');


	createBoard();
	boardState = createCells();
	$canvas.on('click', makeMove);



})


// *** TICTACTOE SCRIPTS!!! ***
var $canvas;
var context;
var numRows = 3;
var numColumns = 3;
var blockSize = 100;
var boardState;
var count = 0;
var currentMove;
var winner;


function createBoard(){
	context.translate(0, 0);
	// context.lineWidth = 0.5;

	for (var row=0; row < numRows; row++) {
		for (var col=0; col < numColumns; col++) {
			var x = col * blockSize;
			var y = row * blockSize;

			var gradient=context.createLinearGradient(0,0,300,300);
			gradient.addColorStop("1.0","yellow");
			gradient.addColorStop("0.5","blue");
			gradient.addColorStop("0","green");

			context.strokeStyle=gradient;
			context.lineWidth=2;


			context.strokeRect(x, y, blockSize, blockSize);
		}
	}
}

function createCells() {
	var tictactoeBoard = new Array(numRows);
	for (var i = 0; i < numRows; i++) {
		tictactoeBoard[i] = new Array(numColumns);
	}
	return tictactoeBoard;
}



function makeMove(e) {
	var x = e.offsetX;
	var y = e.offsetY;
	var col = Math.floor(x/blockSize);
	var row = Math.floor(y/blockSize);
	var game_id = $('.hidden').text();
	debugger;

	if (winner == "Draw" || winner == "X" || winner == "O") {
		alert("Games over bro");
	} else {
	validateMove(col, row);

	var winningCombinations = [boardState[2][0] != null && boardState[2][0] === boardState[2][1] && boardState[2][1] === boardState[2][2], boardState[1][0] != null && boardState[1][0] === boardState[1][1] && boardState[1][1] === boardState[1][2], boardState[0][0] != null && boardState[0][0] === boardState[0][1] && boardState[0][1] === boardState[0][2], boardState[1][0] != null && boardState[1][0] === boardState[2][0] && boardState[2][0] === boardState[0][0], boardState[0][1] != null && boardState[0][1] === boardState[1][1] && boardState[1][1] === boardState[2][1], boardState[0][2] != null && boardState[0][2] === boardState[1][2] && boardState[1][2] === boardState[2][2], boardState[0][0] != null && boardState[0][0] === boardState[1][1] && boardState[1][1] === boardState[2][2], boardState[2][0] != null && boardState[2][0] === boardState[1][1] && boardState[1][1] === boardState[0][2]];
	gameWinner(winningCombinations);
	}

	$.ajax({
		url: '/games/api/tictactoe',
		method: 'PATCH',
		dataType: 'JSON',
		data: {currentMove: currentMove, winner: winner, id: game_id},
		success: function(updated_data){
			$('#current_move').text(updated_data.nextmove)
			winner = updated_data.winner;
		}
	})

}

function validateMove(col, row){
	if (boardState[row][col]) {
		alert('"seats taken" - Some smartass kid in Forrest Gump');
	} else {
		if (currentMove == null || currentMove == "X") {
			boardState[row][col] = "X";
			displayMove("X", col, row);
			currentMove = "O"
			count++;
		} else {
			boardState[row][col] = "O";
			displayMove("O", col, row);
			currentMove = "X"
			count++;
		}
	}
	boardState;
}

function displayMove(move, col, row){
	context.translate(0, 0);
	context.font = "50pt Arial";
	context.textAlign = "center";
	context.textBaseline = "middle";

	var gradient=context.createLinearGradient(0,0,300,0);
	gradient.addColorStop("0","magenta");
	gradient.addColorStop("0.2","blue");
	gradient.addColorStop("0.4","green");
	gradient.addColorStop("0.6","yellow");
	gradient.addColorStop("0.8","orange");
	gradient.addColorStop("1.0","red");

	context.strokeStyle = gradient;
	context.strokeText(move, col*blockSize+(blockSize*0.5), row*blockSize+(blockSize*0.5));
}

function gameWinner(winningCombinations){
	winningCombinations.forEach(function(value){
		if (value) {
			if (currentMove === "X") {
				alert("O WINS!!!!");
				winner = "O";
			} else {
				alert("X WINS!!!!");
				winner = "X";
			}
		}
	});
		if (count === 9) {
			alert("its a draw...");
			winner = "Draw"
		}
}










//Hangman Script
function hangmanLetterGuess(){
	$(document).keypress(function(e) {
		var keycode = e.keyCode || e.which;
		guessed_letter = String.fromCharCode(keycode);

		alreadyGuessedValidation(guessed_letter);
	})
}

function finishedHangman(victory_data){
	if (victory_data){
			alert('YOU WON!!!!!!');
	} else if (victory_data === false){
			alert('YOU LOST!!!!!');
	}
}

function alreadyGuessedValidation(guessed_letter){
	var guesses = $('#bad_guesses').text() + $('#good_guesses').text()
		if (guesses.indexOf(guessed_letter) >= 0){
			alert("this letter already guessed!");
		} else {
			guessedLetterPatch();
		}
} 

function guessedLetterPatch(){
	var game_id = $('.hidden').text();
	$.ajax({
			url: '/games/api/hangmanguess',
			method: 'PATCH',
			dataType: 'JSON',
			data: {guessed_letter: guessed_letter, id: game_id},
			success: function(updated_data){
				$('#hangman_word').text(updated_data.game_state);
				console.log(updated_data.game_state);
				$('#bad_guesses').text(updated_data.bad_guesses);
				$('#good_guesses').text(updated_data.good_guesses);
				$('#guess_count').text(updated_data.badguess_count);
				finishedHangman(updated_data.victory);
			}
		})
}