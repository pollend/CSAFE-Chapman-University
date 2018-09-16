Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_scope :user do
   authenticated :user do
     root 'login#index', as: :authenticated_root
    end

    unauthenticated do
      root 'devise/sessions#new', as: :unauthenticated_root
    end
  end
  get 'admin' => 'admin#admin'
  get 'ride/request_ride' => "ride#request_ride"
  get 'admin/bounds' => "admin#bounds"
  get 'admin/charts' => "admin#charts"



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
      get '/admin/getRidesToday' => 'rides#getRidesToday'
      get '/admin/downloadReport' => "rides#CSAFEdailyReport"
    end
  end

  mount ActionCable.server => '/cable'


end
