class OrdemServicoExame < ApplicationRecord
  validates :exame_id, presence: { message: 'É obrigatório informar o exame.' }

  belongs_to :exame, optional: true

  def self.search_by_ordem_servico_id(ordem_servico_id)
    select('
      ordem_servico_exames.id as ordem_servico_exame_id,
      exames.id as exame_id,
      exames.descricao as exame_descricao,
      exames.preco as exame_preco
    ')
    .left_outer_joins(:exame)
    .where(ordem_servico_id: ordem_servico_id)
  end
end
