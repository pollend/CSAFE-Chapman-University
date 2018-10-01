source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'activeadmin', '~> 1.3'
gem 'bootsnap', '>= 1.1.0', require: false
gem 'coffee-rails', '~> 4.2'
gem 'devise'
gem 'jbuilder', '~> 2.5'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 3.11'
gem 'pundit'
gem 'rails', '~> 5.2.0'
gem 'sass-rails', '~> 5.0'
gem 'sendgrid-actionmailer', '~> 0.2.1'
gem 'slim-rails'
gem 'turbolinks', '~> 5'
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem 'uglifier', '>= 1.3.0'
gem 'webpacker', '~> 3.5'

gem 'jquery_mask_rails' # more details at http://bit.ly/jquery-mask-gem
gem 'chartkick' #https://github.com/ankane/chartkick
gem 'groupdate' #https://github.com/ankane/groupdate
gem 'rubyzip', '>= 1.2.1'
gem 'axlsx', git: 'https://github.com/randym/axlsx.git', ref: 'c8ac844' #https://github.com/straydogstudio/axlsx_rails
gem 'axlsx_rails'
gem 'jquery-rails'
gem 'tod'
gem 'rolify'
gem 'hashid-rails', '~> 1.0'

# trailblazer
gem 'trailblazer', '>= 2.0.3'
gem 'trailblazer-rails'
gem 'trailblazer-cells'
gem 'cells-rails'
gem 'cells-slim'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'dotenv-rails'
  gem 'factory_bot_rails'
  gem 'rspec-rails', '~> 3.7'
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  gem 'capybara', '>= 2.15', '< 4.0'
  gem 'selenium-webdriver'
  gem 'chromedriver-helper'
end
