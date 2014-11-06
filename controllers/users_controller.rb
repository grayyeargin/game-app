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

  post '/sessions' do
    user = User.find_by(username: params[:username])
    if user && user.password == params[:password]
      session[:current_user] = user.id
      redirect '/games'
    else
      redirect '/'
    end
  end

  delete '/sessions' do
    session[:current_user] = nil
    redirect '/'
  end

end