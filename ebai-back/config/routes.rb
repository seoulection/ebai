Rails.application.routes.draw do
  # resources :auctions
  resources :auctions do
    resources :bids
  end
  resources :users

  get 'dashboard', controller: :dashboard, action: :index
  get 'signin', controller: :signin, action: :index
  post 'signin', controller: :signin, action: :create
  delete 'signin', controller: :signin, action: :destroy
end
