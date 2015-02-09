class UsersController < ApplicationController

  get '/new' do
    erb :'users/new_user'
  end

  post '/' do
    user = User.new(params[:user])
    user.password = params[:password]
    user.save!
    redirect '/'
  end

end