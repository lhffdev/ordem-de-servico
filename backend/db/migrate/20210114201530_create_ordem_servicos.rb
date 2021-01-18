class CreateOrdemServicos < ActiveRecord::Migration[6.0]
  def change
    create_table :ordem_servicos do |t|
      t.date :data_protocolo, null: false
      t.date :data_retirada_exames, null: false
      t.references :paciente, null: false, foreign_key: true
      t.references :convenio, null: false, foreign_key: true
      t.references :posto_coleta, null: false, foreign_key: true
      t.references :medico, null: false, foreign_key: true

      t.timestamps
    end
  end
end
