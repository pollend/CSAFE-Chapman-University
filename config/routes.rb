Rails.application.routes.draw do
  devise_for :users
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

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
