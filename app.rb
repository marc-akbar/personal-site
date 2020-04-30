require 'sinatra'
require 'sinatra/reloader'
require 'sass/plugin/rack'
require 'uglifier'
require './lib/helpers'

Sass::Plugin.options[:style] = :compressed
use Sass::Plugin::Rack

Uglifier.compile(File.read("./public/javascripts/application.js"), harmony: true)

configure :development do
  register Sinatra::Reloader
end

get '/' do
  erb :work
end

get '/about' do
  erb :about
end
