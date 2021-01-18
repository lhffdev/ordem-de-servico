class MedicosController < ApplicationController
  def index
    @medicos = Medico.all
  end
end
