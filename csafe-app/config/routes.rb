Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "login#index"
  get 'admin' => 'pages#admin'
  get 'ride/request_ride' => "ride#request_ride"
end
