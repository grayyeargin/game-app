class ApplicationController < Sinatra::Base

  helpers Sinatra::AuthenticationHelper

  before do
    @connection = ActiveRecord::Base.establish_connection({adapter: 'postgresql',database: 'games_db'})
  end
  after do
    @connection.disconnect!
  end

  enable :sessions

  set :views, File.expand_path("../../views", __FILE__)
  set :public_folder, File.expand_path("../../public", __FILE__)

  get '/' do
    erb :index
  end

end