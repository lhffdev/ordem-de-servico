class CreateOrdemServicoExames < ActiveRecord::Migration[6.0]
  def change
    create_table :ordem_servico_exames do |t|
      t.references :exame, null: false, foreign_key: true
      t.references :ordem_servico, null: false, foreign_key: true

      t.timestamps
    end
  end
end
