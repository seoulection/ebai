Rails.application.routes.draw do
  default_url_options :host => 'http://localhost:3000'
  resources :users
  resources :auctions

  get 'dashboard', controller: :dashboard, action: :index
  get 'signin', controller: :signin, action: :index
  post 'signin', controller: :signin, action: :create
  delete 'signin', controller: :signin, action: :destroy
end
