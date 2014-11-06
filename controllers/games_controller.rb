class GamesController < ApplicationController
  helpers HangmanHelper

  get '/' do
    erb :'games/index'
  end

  get '/hangman' do
    @game = Hangmangame.where(user_id: current_user).find_by(victory: false)
    erb :'hangman/index'
  end

  post '/hangman/newgame' do
    if Hangmangame.where(user_id: current_user).find_by(victory: false) == nil
      random_word = elementary_word
      initial_game_state = underscore_display(random_word)
      Hangmangame.create(user_id: current_user.id, word: random_word, game_state: initial_game_state)
      redirect '/games/hangman'
    else
      redirect '/games/hangman'
    end
  end

end