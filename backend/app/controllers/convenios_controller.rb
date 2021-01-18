class ConveniosController < ApplicationController
  def index
    @convenios = Convenio.all
  end
end
