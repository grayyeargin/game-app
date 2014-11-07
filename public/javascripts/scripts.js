console.log(":-)")

//document ready
$(function(){
	if (document.location.pathname == "/games/hangman") {
		hangmanLetterGuess();
	}

})



//Hangman Script
function hangmanLetterGuess(){
	$(document).keypress(function(e) {
		var keycode = e.keyCode || e.which;
		guessed_letter = String.fromCharCode(keycode);

		alreadyGuessedValidation(guessed_letter);
	})
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
			}
		})
}



// function hangmanLetterGuess(){
// 	$(document).keypress(function(e) {
// 		var keycode = e.keyCode || e.which;
// 		guessed_letter = String.fromCharCode(keycode);
// 		var game_id = $('#game_id').val();
		
// 		$.ajax({
// 			url: '/games/api/hangmanguess',
// 			method: 'PATCH',
// 			dataType: 'JSON',
// 			data: {guessed_letter: guessed_letter, id: game_id},
// 			success: function(updated_data){
// 				$('#hangman_word').text(updated_data.game_state);
// 				console.log(updated_data.game_state);
// 				$('#bad_guesses').text(updated_data.bad_guesses);
// 				$('#good_guesses').text(updated_data.good_guesses);
// 				$('#guess_count').text(updated_data.badguess_count);
// 			}
// 		})
// 	})
// }