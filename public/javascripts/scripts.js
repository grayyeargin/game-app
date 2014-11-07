console.log(":-)")


var $canvas;
var context;
var numRows = 3;
var numColumns = 3;
var blockSize = 70;



//document ready
$(function(){
	if (document.location.pathname == "/games/hangman") {
		hangmanLetterGuess();
	}

	$canvas = $('#tictac_board');
	context = $canvas[0].getContext('2d');

	createCells();
	createBoard();



})


// *** TICTACTOE SCRIPTS!!! ***
var $canvas;
var context;
var numRows = 3;
var numColumns = 3;
var blockSize = 70;


function createBoard(){
	context.translate(0, 0);
	context.lineWidth = 0.5;

	for (var row=0; row < numRows; row++) {
		for (var col=0; col < numColumns; col++) {
			var x = col * blockSize;
			var y = row * blockSize;
			context.strokeRect(x, y, blockSize, blockSize)
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