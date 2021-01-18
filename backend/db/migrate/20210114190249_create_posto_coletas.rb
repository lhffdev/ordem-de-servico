class CreatePostoColetas < ActiveRecord::Migration[6.0]
  def change
    create_table :posto_coletas do |t|
      t.string :descricao, null: false, index: { unique: true }
      t.string :endereco, null: false

      t.timestamps
    end
  end
end
