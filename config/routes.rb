Rails.application.routes.draw do
  get 'lessons/index'
  post 'lessons/create'
  patch 'lessons/:id/patch', to: 'lessons#update'
  patch 'lessons/:id/enroll', to: 'lessons#enroll'
  get 'lessons/destroy'

  get 'student/index'
  post 'student/create'
  get 'student/:id/lessons', to: 'student#lessons'
  get 'student/show/:id', to: 'student#show'

  get 'coach/index'
  get 'coach/:id/lessons', to: 'coach#lessons'
  post 'coach/create'
  get 'coach/show/:id', to: 'coach#show'

  root 'homepage#index'
  get '*path', to: 'homepage#index'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
