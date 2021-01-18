Rails.application.routes.draw do
  scope defaults: {format: :json} do
    resources :pacientes, only: %i[index]
    resources :posto_coletas, only: %i[index]
    resources :exames, only: %i[index]
    resources :medicos, only: %i[index]
    resources :convenios, only: %i[index]
    resources :dashboard, only: %i[index]
    resources :ordem_servicos, only: %i[index create show update destroy]
  end
end
