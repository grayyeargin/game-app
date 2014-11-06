require 'bundler'
Bundler.require

ActiveRecord::Base.establish_connection({
  adapter: 'postgresql',
  database: 'games_db'
})

require 'sinatra/activerecord/rake'