Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_scope :user do
    root "devise/sessions#new"
  end
  get 'admin' => 'admin#admin'
  get 'ride/request_ride' => "ride#request_ride"
  get 'admin/bounds' => "admin#bounds"


  namespace 'api' do
    namespace 'v1' do
      resources :zones
      resources :hours
      put 'admin/add' => 'admin#add'
      put 'admin/remove/:id' => 'admin#remove'
    end
  end



end
