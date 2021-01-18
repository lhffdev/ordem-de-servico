json.atendimentos_por_mes @atendimentos_por_mes do |atendimento_por_mes|
  json.call(atendimento_por_mes, :mes_ano, :quantidade)
end
json.exames_pendentes_e_realizados do
  json.call(@exames_pendentes_e_realizados[0], :total_de_exames, :exames_pendentes, :exames_realizados)
end