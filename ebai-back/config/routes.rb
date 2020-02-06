Rails.application.routes.draw do
  resources :users
  resources :auctions

  get 'signin', controller: :signin, action: :index
  post 'signin', controller: :signin, action: :create
  delete 'signin', controller: :signin, action: :destroy
end
