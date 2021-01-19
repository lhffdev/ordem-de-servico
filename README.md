## Informações sobre versões e tecnologias utilizadas no desenvolvimento do projeto
### Front-end
- Angular v9
- Node v12.16.3

### Back-end
- Ruby v2.6.6
- Rails v6.0.3.4

### Banco de dados
- PostgreSQL v12 

## Manual de configuração do ambiente de desenvolvimento
#### Obs: As instruções abaixo foram validadas em sistemas baseados em Unix.
No processo de desenvolvimento foi utilizado o Docker, com isso será demonstrado como configurar o ambiente utilizando o mesmo, porém você pode executar localmente em seu sistema operacional.

### Passos para configuração do ambiente
#### 1) Instalação do Docker.
- [Click aqui](https://docs.docker.com/engine/install/) para ser direcionado ao site oficial do Docker, e seguir as instruções de instalação.

#### 2) Instalação do docker-compose.
- [Click aqui](https://docs.docker.com/compose/install/) para ser direcionado ao site oficial do Docker, e seguir as instruções de instalação.

#### 3) Clonar o projeto em sua máquina.
Escolha o local que deseja clonar o projeto em seu computador e execute o seguinte comando em seu terminal:
```
 git clone git@github.com:lhffdev/ordem-de-servico.git
```
#### 4) Configuração do servidor de banco de dados.
Caso você possua um servidor de banco de dados postgreSQL em sua máquina, essa etapa poderá ser desconsiderada. 

Para clonar o projeto da imagem Docker do postgreSQL, escolha o local que deseja armazenar e execute o seguinte comando em seu terminal:
```
git clone git@github.com:lhffdev/container-docker-postgresql.git
```
Navegue até a raiz do projeto, crie um arquivo com o nome `.env` para configurarmos as variáveis de ambiente do container.
Acesse o arquivo criado com o seu editor de preferência e inclua o seguinte conteúdo:
```
POSTGRES_USER=postgres
POSTGRES_DB=postgres
POSTGRES_PASSWORD=postgres 
```
Para manipular o servidor do postgreSQL, como iniciar ou finalizar a aplicação, existe uma pasta chamada ``scripts`` na raiz do projeto com comandos prontos que fazem esse trabalho, desse modo para iniciar o servidor execute o seguinte comando em seu terminal:
```
./scripts/up.sh 
``` 

#### 5) Configuração das variáveis de ambiente do back-end e inicialização do sistema.
Navegue até o diretório que contém o fonte da aplicação de ordem de serviço, acesse a pasta ``backend``, crie o arquivo chamado ``.env`` para configurarmos as variáveis de ambiente do projeto.
Acesse o arquivo criado com o seu editor de preferência e inclua o seguinte conteúdo:
```
DATABASE_ADAPTER=postgresql
DATABASE_HOST="COLOQUE O IP DO SEU COMPUTADOR AQUI, EX: 192.168.0.150" 
DATABASE_PORT=5432
DATABASE_NAME=ordem-de-servico
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
```
Para manipular o servidor de back-end, como iniciar ou finalizar a aplicação, existe uma pasta chamada ``scripts`` na raiz do projeto com comandos prontos que fazem esse trabalho, dessa forma para iniciar o servidor execute o seguinte comando em seu terminal estando na raiz do projeto:
```
./scripts/up-backend.sh 
``` 
Para criar o banco de dados, realizar as migrações das tabelas e executar o seed inicial do projeto execute os seguintes comando em seu terminal, estando na raiz do projeto:
```
docker exec -it ordem-de-servico-backend /bin/bash 
```
Em seguida:
```
rails db:create db:migrate db:seed
```
#### 6) Configuração das variáveis de ambiente do front-end e inicialização do sistema.
Navegue até o diretório que contém o fonte da aplicação de ordem de serviço, crie o arquivo chamado ``.env.json`` no diretório ``/frontend/src``, para configurarmos as variáveis de ambiente do projeto.
Acesse o arquivo criado com o seu editor de preferência e inclua o seguinte conteúdo:
```
{
	"apiUrl": "http://192.168.0.150:3000"
} 
``` 
>**Obs:** O IP acima é apenas um exemplo, portanto você deverá incluir o IP do seu computador.

Para manipular o servidor de front-end, como iniciar ou finalizar a aplicação, existe uma pasta chamada ``scripts`` na raiz do projeto com comandos prontos que fazem esse trabalho, com isso para iniciar o servidor execute o seguinte comando em seu terminal estando na raiz do projeto:
```
./scripts/up-frontend.sh 
``` 
#### 7) Acessar o sistema pelo navegador.
Abra o seu navegador de preferência e digite o seguinte endereço: ``http://localhost:4200/``

### Pronto, o sistema já está pronto para uso 🎉🎉🎉 