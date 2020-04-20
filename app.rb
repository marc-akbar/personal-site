require 'sinatra'
require 'sinatra/reloader'
require 'sass/plugin/rack'
require './lib/helpers'

Sass::Plugin.options[:style] = :compressed
use Sass::Plugin::Rack

configure :development do
  register Sinatra::Reloader
end

get '/' do
  erb :work
end

get '/about' do
  erb :about
end
