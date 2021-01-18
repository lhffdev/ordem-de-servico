class PostoColetasController < ApplicationController
  def index
    @posto_coletas = PostoColeta.all
  end
end
