require 'sinatra'
require 'sinatra/reloader'
require './lib/helpers'

configure :development do
  register Sinatra::Reloader
end

get '/' do
  erb :homepage
end
