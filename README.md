# Backend - Dominando NodeJS
## Aulas assistidas:
* Conceitos básicos - 0101
* Conceitos básicos de uma API REST - 0102
* Conceitos básicos sobre JSON - 0103
* Instalando o NodeJS - 0104
* Instalando o Yarn - 0105
* Como criar uma aplicação e instalar os pacotes iniciais - 0201
- yarn init -y / npm init -y
- yarn add express / npm install express
* Criando um servidor Express - 0202
* Consumindo parâmetros de QUery e Route - 0203
* Principais ferramentas auxiliares - 0301
* Utilizando o Insomnia - 0302
* Utilizando o Nodemon - 0303
- yarn add nodemon -D / npm install nodemon -D
- npx nodemon index.js / npm run dev (adicionado comando no package.json/scripts)
* O que é o padrão REST - 0401
* Listagem dos registros - 0402
* Inserção de registros - 0403
* Atualização de registros - 0404
* Exclusão de registros - 0405
* Debugando com console - 0501
- console.debug(): detalhes de desenvolvimento
- console.log(): mensagem informativa
- console.warn(): merece um pouco mais de atenção
- console.error(): mensagem preocupante, está acontecendo alguma coisa problemática na aplicação
* Debugando via Visual Studio Code - 0502
* Configurando uma estrutura moderna - 0601
- src: pasta que contém todos os nossos arquivos fonte, arquivos de desenvolvimento
- app.js: arquivo que vai ser a nossa aplicação, iniciar todo o processo e arquitetar todo o processo de rotas e do Express
- routes.js: arquivo que vai ser especializado em agrupar as rotas da nossa aplicação direcionando para o controller específico
- server.js: basicamente tudo o que ele vai fazer é importar o app e inicializar o servidor na porta especificada
- É interessante separar a camada lógica da camada de servidor porque quando eu quiser testar a classe App com testes automatizados
em que eu não precise levantar um servidor eu tenho essa possibilidade
* Configurando uma estrutura de controllers - 0602
- Controllers: lógica da aplicação, todos os arquivos aqui vão ser correspondentes a um domínio da informação ou um recurso de acordo
com o padrão REST
* Ajustando as sintaxes de import - 0603
- yarn add sucrase -D / npm install sucrase -D
- nodemon.json
* ESLint, Prettier e EditorConfig - 0604
- yarn add eslint -D / npm install eslint -D
- yarn eslint --init / npx eslint --init
- yarn add prettier eslint-config-prettier eslint-plugin-prettier -D / npm install prettier eslint-config-prettier eslint-plugin-prettier -D
- yarn eslint --fix src --ext .js /
* O que é um ORM - 0701
- Object Relational Mapper: abstração de banco de dados que tabelas se tornam classes
- Migrations: controla as versões das tabelas/banco de dados, cada migration contém as instruções de criação, alteração e remoção de tabelas
e colunas, permite manter a base sempre atualziada ordenada por data/hora, toda migração precisa ter up (criar) e down (deletar), cada
migração deve manipular uma única tabela
* Instalando e utilizando Sequelize - 0702
- yarn add sequelize / npm install sequelize
- yarn add sequelize-cli -D / npm install sequelize-cli -D
- .sequelizerc: arquivo de configurações do sequelize
- yarn add pg pg-hstore / npm install pg pg-hstore
* Criando o model Customer - 0703
- yarn sequelize migration:create --name=create-customers / npx sequelize migration:create --name=create-customers
- yarn sequelize db:migrate / npx sequelize db:migrate
- yarn sequelize db:migrate:undo:all / npx sequelize db:migrate:undo:all -> desfaz todas as migrações
* Criando o model Contact - 0704