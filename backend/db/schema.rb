# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_01_14_202044) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "convenios", force: :cascade do |t|
    t.string "nome", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "exames", force: :cascade do |t|
    t.string "descricao", null: false
    t.float "preco", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["descricao"], name: "index_exames_on_descricao", unique: true
  end

  create_table "medicos", force: :cascade do |t|
    t.string "nome", null: false
    t.string "especialidade", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["nome", "especialidade"], name: "index_medicos_on_nome_and_especialidade", unique: true
  end

  create_table "ordem_servico_exames", force: :cascade do |t|
    t.bigint "exame_id", null: false
    t.bigint "ordem_servico_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["exame_id"], name: "index_ordem_servico_exames_on_exame_id"
    t.index ["ordem_servico_id"], name: "index_ordem_servico_exames_on_ordem_servico_id"
  end

  create_table "ordem_servicos", force: :cascade do |t|
    t.date "data_protocolo", null: false
    t.date "data_retirada_exames", null: false
    t.bigint "paciente_id", null: false
    t.bigint "convenio_id", null: false
    t.bigint "posto_coleta_id", null: false
    t.bigint "medico_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["convenio_id"], name: "index_ordem_servicos_on_convenio_id"
    t.index ["medico_id"], name: "index_ordem_servicos_on_medico_id"
    t.index ["paciente_id"], name: "index_ordem_servicos_on_paciente_id"
    t.index ["posto_coleta_id"], name: "index_ordem_servicos_on_posto_coleta_id"
  end

  create_table "pacientes", force: :cascade do |t|
    t.string "nome", null: false
    t.date "data_nascimento", null: false
    t.string "sexo", null: false
    t.string "endereco", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["nome"], name: "index_pacientes_on_nome", unique: true
  end

  create_table "posto_coletas", force: :cascade do |t|
    t.string "descricao", null: false
    t.string "endereco", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["descricao"], name: "index_posto_coletas_on_descricao", unique: true
  end

  add_foreign_key "ordem_servico_exames", "exames"
  add_foreign_key "ordem_servico_exames", "ordem_servicos"
  add_foreign_key "ordem_servicos", "convenios"
  add_foreign_key "ordem_servicos", "medicos"
  add_foreign_key "ordem_servicos", "pacientes"
  add_foreign_key "ordem_servicos", "posto_coletas"
end
