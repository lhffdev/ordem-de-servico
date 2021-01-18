class CreateMedicos < ActiveRecord::Migration[6.0]
  def change
    create_table :medicos do |t|
      t.string :nome, null: false
      t.string :especialidade, null: false
      t.index [:nome, :especialidade], unique: true

      t.timestamps
    end
  end
end
