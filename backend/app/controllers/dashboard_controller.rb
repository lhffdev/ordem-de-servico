class DashboardController < ApplicationController
  def index
    @atendimentos_por_mes = OrdemServico.atendimentos_por_mes
    @exames_pendentes_e_realizados = OrdemServico.exames_pendentes_e_realizados
  end
end
