require 'bundler'
Bundler.require

require './models/user'
require './models/hangmangame'

require './helpers/authentication_helper'
require './helpers/hangman_helper'

require './controllers/application_controller'
require './controllers/games_controller'
require './controllers/users_controller'

Dir.glob("./{controllers,models,helpers}/*.rb") do |file|
	require file
	puts "required #{file}"
end


map('/users'){ run UsersController }
map('/games'){ run GamesController }
map('/'){ run ApplicationController }