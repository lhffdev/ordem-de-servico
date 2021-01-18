json.partial! "ordem_servicos/ordem_servico", ordem_servico: @ordem_servico
json.exames @exames do |exame|
  json.call(exame, :ordem_servico_exame_id, :exame_id, :exame_descricao, :exame_preco)
end