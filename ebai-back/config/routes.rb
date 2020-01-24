Rails.application.routes.draw do
  resources :users
  resources :contacts
  
  get 'signin', controller: :signin, action: :index
  post 'signin', controller: :signin, action: :create
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
