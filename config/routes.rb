Rails.application.routes.draw do

  root "home#index"

  resources :users, only: [:new, :create, :show] do
    resources :trails
  end

  resources :countries, only: [:index, :show]

  resources :trails, only: [:show]

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  get '/signup' => 'users#new'
  post '/signup' => 'users#create'

  get "auth/facebook/callback" =>  'sessions#facebook'

  get '/trails_by_time' => 'trails#trails_by_time'
  get '/trails_by_distance' => 'trails#trails_by_distance'
  get '/trails_by_difficulty' => 'trails#trails_by_difficulty'
end
