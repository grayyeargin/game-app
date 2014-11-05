require 'bundler'
Bundler.require


require './helpers/hangman_helper'

require './controllers/application_controller'
require './controllers/games_controller'

Dir.glob("./{controllers,models,helpers}/*.rb") do |file|
	require file
	puts "required #{file}"
end

map('/games'){ run GamesController }
map('/'){ run ApplicationController }