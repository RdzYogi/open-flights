Rails.application.routes.draw do
  root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :airlines, param: :slug
      resources :reviews, only: [:create, :destroy]
    end
  end

  # All routes not matching the above will be handled by the React Router

  # This is the catch-all route that will send all requests to the React app
  get '*path', to: 'pages#index', via: :all
end
