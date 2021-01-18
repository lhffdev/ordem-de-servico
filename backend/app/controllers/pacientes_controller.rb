class PacientesController < ApplicationController
  def index
    @pacientes = Paciente.all
  end
end
