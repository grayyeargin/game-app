class GamesController < ApplicationController
  helpers HangmanHelper


  get '/' do
    erb :'games/index'
  end




# **** HANGMAN ROUTES!!! ****
  get '/hangman' do
    @game = Hangmangame.where(user_id: current_user).find_by(victory: nil)
    erb :'hangman/index'
  end

  #Either making new hangman game or taking to unifinished game
  post '/hangman/newgame' do
    if Hangmangame.where(user_id: current_user).find_by(victory: nil) == nil
      random_word = elementary_word
      initial_game_state = underscore_display(random_word)
      Hangmangame.create(user_id: current_user.id, word: random_word, game_state: initial_game_state)
      redirect '/games/hangman'
    else
      redirect '/games/hangman'
    end
  end

  #updating current hangman game
  patch '/api/hangmanguess' do
    content_type :json
    guessed_letter = params[:guessed_letter]
    current_game = Hangmangame.find_by(id: params[:id])
    current_game.correct_letter?(guessed_letter)

    updated_game = Hangmangame.find_by(id: params[:id])

    {
      game_state: updated_game.game_state,
      bad_guesses: updated_game.bad_guesses,
      good_guesses: updated_game.good_guesses,
      badguess_count: updated_game.badguess_count,
      last_guess: updated_game.last_guess,
      victory: updated_game.victory
    }.to_json
  end





# **** TIC TAC TOE ROUTES!!! ****
  get '/tictactoe' do
    erb :'tictactoe/index'
  end




end