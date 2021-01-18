class OrdemServicosController < ApplicationController
  before_action :validar_exames!, only: %i[create update]
  before_action :set_ordem_servico, only: %i[update destroy]

  def index
    if params[:search_term].present?
      @ordem_servicos = OrdemServico.filter_list(params[:search_term])
    else
      @ordem_servicos = OrdemServico.list_all
    end
  end

  def show
    @ordem_servico = OrdemServico.search_by_id(params[:id])
    
    raise ActiveRecord::RecordNotFound, 'Ordem de serviço não localizada.' if @ordem_servico.nil?
    
    @exames = OrdemServicoExame.search_by_ordem_servico_id(params[:id])
  end

  def create
    with_transaction do
      ordem_servico = OrdemServico.new(ordem_servico_params.merge!({data_protocolo: Date.current}))
      ordem_servico.ordem_servico_exame = ordem_servico_exame_params.map { |exame_params| OrdemServicoExame.new(exame_params) }
      
      error ordem_servico.errors unless ordem_servico.save
      
      render json: { ordemServicoId: ordem_servico.id}
    end
  end

  def update
    with_transaction do
      @ordem_servico.attributes = ordem_servico_params

      ordem_servico_exame_ids = ordem_servico_exame_params.map { |exame| exame[:ordem_servico_exame_id] }
      @ordem_servico.ordem_servico_exame.where.not(id: ordem_servico_exame_ids).destroy_all

      ordem_servico_exame_params.each do |exame_params|
        ordem_servico_exame = OrdemServicoExame.find_or_initialize_by(id: exame_params[:ordem_servico_exame_id])
        ordem_servico_exame.ordem_servico_id = @ordem_servico.id
        ordem_servico_exame.exame_id = exame_params[:exame_id]

        error ordem_servico_exame.errors unless ordem_servico_exame.save
      end

      error @ordem_servico.errors unless @ordem_servico.save
     
      render json: { ordemServicoId: @ordem_servico.id}
    end
  end

  def destroy
    @ordem_servico.destroy
  end

  private
  
  def validar_exames!
    error 'É obrigatório informar pelo menos um exame.' unless ordem_servico_exame_params&.length
  end
  
  def set_ordem_servico
    @ordem_servico = OrdemServico.find(params[:id])
  end

  def ordem_servico_params
    params.permit(
      :paciente_id,
      :convenio_id,
      :posto_coleta_id,
      :medico_id,
      :data_retirada_exames
    )
  end

  def ordem_servico_exame_params
    params[:exames]&.map do |exame|
      exame.permit(
        :ordem_servico_exame_id,
        :exame_id
      )
    end
  end
end
