class OrdemServico < ApplicationRecord
  validates :data_protocolo, presence: { message: 'É obrigatório informar a data do protocolo.' }
  validates :data_retirada_exames, presence: { message: 'É obrigatório informar a data de retirada dos exames.' }
  validates :paciente_id, presence: { message: 'É obrigatório informar o paciente.' }
  validates :convenio_id, presence: { message: 'É obrigatório informar o convênio.' }
  validates :posto_coleta_id, presence: { message: 'É obrigatório informar o posto de coleta.' }
  validates :medico_id, presence: { message: 'É obrigatório informar o médico.' }
  validates :ordem_servico_exame, length: {
    minimum: 1,
    message: 'É obrigatório informar pelo menos um exame.'
  }

  belongs_to :paciente, optional: true
  belongs_to :convenio, optional: true
  belongs_to :posto_coleta, optional: true
  belongs_to :medico, optional: true

  has_many :ordem_servico_exame, dependent: :destroy, autosave: true

  def self.list_all
    select('
      ordem_servicos.*,
      pacientes.id as paciente_id,
      pacientes.nome as paciente_nome,
      pacientes.endereco as paciente_endereco,
      convenios.id as convenio_id,
      convenios.nome as convenio_nome,
      posto_coletas.id as posto_coleta_id,
      posto_coletas.descricao as posto_coleta_descricao,
      posto_coletas.endereco as posto_coleta_endereco,
      medicos.id as medico_id,
      medicos.nome as medico_nome,
      medicos.especialidade as medico_especialidade
    ')
    .left_outer_joins(
      :paciente,
      :convenio,
      :posto_coleta,
      :medico
    )
    .order('ordem_servicos.id')
  end

  def self.search_by_id(ordem_servico_id)
    list_all.where(['ordem_servicos.id = ?', ordem_servico_id]).first
  end

  def self.filter_list(search_term)
    search_term = search_term.to_s.strip

    if search_term.match?(/^\d+$/)
      list_all.where('ordem_servicos.id = ?', search_term.to_i)
    elsif search_term.match?(/\A(\d{1,2}\/\d{1,2}\/\d{4})+\z/) && Date.strptime(search_term, '%d/%m/%y').present?
      list_all.where('ordem_servicos.data_protocolo = ?', search_term.to_date)
    else
      list_all.where(<<~SQL, "%#{search_term}%", "%#{search_term}%")
        pacientes.nome ilike ? or
        posto_coletas.descricao ilike ?
      SQL
    end
  end

  def self.atendimentos_por_mes
    select("
      concat(extract(month from data_protocolo), '/', extract(year from data_protocolo)) as mes_ano,
      count(id) as quantidade
    ")
    .group('1')
  end

  def self.exames_pendentes_e_realizados
    select('
      count(1) as total_de_exames,
      sum(case when data_retirada_exames > CURRENT_DATE then 1 else 0 end) as exames_pendentes,
      sum(case when data_retirada_exames <= CURRENT_DATE then 1 else 0 end) as exames_realizados
    ')
    .left_outer_joins(:ordem_servico_exame)
  end
end
