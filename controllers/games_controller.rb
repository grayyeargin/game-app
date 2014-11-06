class GamesController < ApplicationController
  helpers HangmanHelper

  get '/' do
    "Game options here"
  end

  get '/hangman' do
    erb :'hangman/index'
  end

  get '/hangman/newgame' do
    random_word = elementary_word
    #create blanks for each letter of word
    initial_game_state = underscore_display(random_word)


  end

end