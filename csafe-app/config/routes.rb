Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "login#index"
  get 'admin' => 'admin#admin'
  get 'ride/request_ride' => "ride#request_ride"
  get 'admin/bounds' => "admin#bounds"

  namespace 'api' do
    namespace 'v1' do
      resources :zones
      resources :hours
      resources :rides
      put 'admin/add' => 'admin#add'
      put 'admin/remove/:id' => 'admin#remove'
      put 'admin/updateRideStatus/:id' => 'rides#update'
      put 'admin/removeRide/:id' => 'rides#destroy'
      put '/ride/request_ride/request' => 'rides#create'
    end
  end


end
