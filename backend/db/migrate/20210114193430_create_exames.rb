class CreateExames < ActiveRecord::Migration[6.0]
  def change
    create_table :exames do |t|
      t.string :descricao, null: false, index: { unique: true }
      t.float :preco, null: false

      t.timestamps
    end
  end
end
