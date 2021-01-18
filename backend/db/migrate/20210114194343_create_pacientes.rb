class CreatePacientes < ActiveRecord::Migration[6.0]
  def change
    create_table :pacientes do |t|
      t.string :nome, null: false, index: { unique: true }
      t.date :data_nascimento, null: false
      t.string :sexo, null: false
      t.string :endereco, null: false

      t.timestamps
    end
  end
end
