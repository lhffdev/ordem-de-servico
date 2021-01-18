JSON.parse(File.read(Rails.root.join('lib', 'seeds', 'pacientes.json')), symbolize_names: true).each do |paciente|
	Paciente.create!(paciente)
end

JSON.parse(File.read(Rails.root.join('lib', 'seeds', 'postos_coleta.json')), symbolize_names: true).each do |posto_coleta|
	PostoColeta.create!(posto_coleta)
end

JSON.parse(File.read(Rails.root.join('lib', 'seeds', 'medicos.json')), symbolize_names: true).each do |medico|
	Medico.create!(medico)
end

JSON.parse(File.read(Rails.root.join('lib', 'seeds', 'exames.json')), symbolize_names: true).each do |exames|
	Exame.create!(exames)
end

JSON.parse(File.read(Rails.root.join('lib', 'seeds', 'convenios.json')), symbolize_names: true).each do |convenio|
	Convenio.create!(convenio)
end