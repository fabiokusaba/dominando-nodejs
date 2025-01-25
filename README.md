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
* Criando o model User - 0705
* Carregando os modelos no projeto - 0706
* Alterando modelos - 0707
- remover uma coluna: o processo é ao contrário, ou seja, primeiro vamos remover e depois se a gente quiser refazer a gente vai adicionar a
coluna novamente, então o up vai ser removeColumn e o down addColumn
- adicionar uma coluna: processo inverso, ou seja, aqui no up nós vamos adicionar uma coluna e no down remover uma coluna
- o postgres tem uma particularidade que quando a gente cria um enum dentro do sequelize, enum é um enumerador que só aceita valores pré
definidos, ele cria um tipo personalizado enum_customers_status e o que acontece? Quando eu removo uma coluna e ela é do tipo enum o sequelize
não tem a possibilidade ou não faz automaticamente a remoção desse tipo personalizado, para fazer a sua deleção vamos precisar executar comandos
sql dentro da nossa migration
* Preparando o playground - 0801
* Selecionando atributos - 0802
- dentro de qualquer método find no sequelize você pode abrir as chaves e utilizar o attributes onde você passa um array com os campos que você
deseja mostrar, de outro modo você pode abrir um objeto e dentro dele passar no exclude um array com os campos que você não deseja exibir ou o
include com os campos que você deseja exibir
* Filtros (where) - 0803
- as três formas de se escrever o find: findAll que vai buscar todos os registros, findOne seleciona o primeiro registro, findByPk para buscar
um registro quando se sabe a chave primária
- para fazer filtros no sql usamos o where, ele é escrito como se fosse mais uma propriedade dentro do find e podemos colocar as condições aqui
dentro como se fossem um objeto
- dentro do próprio sequelize a gente tem algumas formas de colocar operadores lógicos importando o Op, porém a sintaxe vai mudar um pouco, na
própria documentação do sequelize temos um manual contendo todos os operadores disponíveis
- é possível passar múltiplos campos
* Inclusão (join) - 0804
- um customer possui vários contatos lá dentro e vamos imaginar que queremos fazer o inner join, ou seja, não queremos listar apenas os customers
mas também os seus contatos e como podemos fazer isso? Dentro do sequelize temos uma chave chamada include que é responsável por fazer o inner
join entre as tabelas, podemos aqui colocar o model direto
- podemos colocar cláusulas dentro do include como por exemplo where, vamos manter o array e dentro dele abriremos as chaves para passar um objeto
- quando temos um inner join somente os customers que possuem contatos que serão exibidos, para voltarmos a opção do left outer join que é opcional
temos que passar o required como false
* Ordenação (order) - 0805
- dentro do sequelize nós temos uma opção de ordenação, relembrando os comandos sql nós temos: SELECT * FROM customers ORDER BY onde passamos o
campo que desejamos ordenar, caso a gente não passe nenhum valor por padrão ele vai ordenar de forma ascendente ASC, quando forçamos colocando o
DESC ele vai ordenar de forma descendente
- no sequelize para trabalharmos com ordenação nós temos o order, ele funciona de uma forma bem similar ao where que já vimos mas você pode colocar
ele diretamente em um array onde você irá colocar os campos
* Paginação (limit e offset) - 0806
- nós podemos limitar a quantidade de registros que vão ser disponibilizados pra gente, em banco de dados com grandes quantidades de registros uma
consulta SELECT * FROM customers pode ferrar com o processamento da máquina então acaba sendo uma má prática, e podemos sanar esse problema com o
uso do LIMIT passando uma quantidade de registros que queremos devolver para aquela consulta, por exemplo quero devolver 10 registros vou usar o
LIMIT 10
- O LIMIT também é utilizado para fazer paginação de registros dentro da web por conta desse mesmo problema que falamos anteriormente, então é uma
boa prática a gente sempre limitar, depois que aplicamos o LIMIT temos a possibilidade de aplicar o OFFSET que é a parte de paginação então ele é
basicamente o LIMIT vezes a página menos o limite
* Funções de agregação (min, max, sum, count) - 0807
- são funções que a gente pode fazer o count, min, max, avg, ou seja, são funções que calculam alguma coisa e um exemplo sql desse tipo de função
seria SELECT count(*) FROM customers
- quando vamos utilizar o max() precisamos passar aqui dentro a função de agregação e o parâmetro da coluna que eu quero contar
- o sum() irá somar os dados de um campo inteiro, interessante utilizá-lo em cenários que temos idade, saldo
* Escopos (scopes) - 0808
- os escopos dentro do sequelize são consultas que você pode deixar pré criadas dentro do próprio model assim conseguimos facilitar e muito a nossa
manutenção e criar consultas que elas sejam reutilizáveis em diversas situações
- para a gente poder usar o nosso escopo antes de qualquer método find precisamos passá-lo
- ou seja, dentro dos escopos podemos passar o sql que quisermos
- podemos passar parâmetros e rodar códigos JS
- a única ressalva é pra você tomar cuidado para não criar regras de negócio, por exemplo se não tiver no estoque faço tal coisa então as regras de
negócio deixamos para uma outra camada, mas os escopos eles servem basicamente pra abstrair algumas consultas que normalmente fazem parte da
inteligência de algum modelo
- como a gente faz para dar merge em escopo? ou seja, a gente utiliza mais de um escopo de uma vez só e para isso posso colocar os escopos dentro de
um array, só uma ressalva que não podemos manipular o mesmo campo em escopos diferentes
* Criação (insert) - 0809
- para inserir um dado no banco chamamos o nosso model com o método create que vai criar um customer em função dos parâmetros que a gente passar, os
parâmetros que a gente passar basicamente é um objeto com o nome dos campos
* Atualização (update) - 0810
- primeiro você precisa fazer uma busca retornando apenas um objeto e depois fazemos as devidas atualizações
- depois que você recuperou o objeto através do findByPk ou findOne, usamos o método update para atualizar os dados
- o método update funciona de forma análoga ao create com exceção que aqui você vai colocar os campos que você quer atualizar
* Exclusão (delete) - 0811
- a exclusão de um registro sempre se dá em cima de um objeto e para isso basta chamarmos o método destroy
* Ganchos de execução (Hooks) - 0812
- os hooks dentro do sequelize como o próprio nome já sugere significa ganchos
- os ganchos sempre vem em função de um evento que você quer realizar
* O que é uma arquitetura MVC - 0901
- arquitetura de software é sobre organização, como as coisas são organizadas
- arquitetura MVC (Model View Controller) é uma das arquiteturas mais utilizadas no mundo do desenvolvimento porque ele permite você separar em
camadas ou separar especialistas pra fazer alguma coisa, ou seja, ele permite separar as camadas (lógica) da aplicação em especialidades, então
sempre que você estiver trabalhando com MVC você vai receber uma requisição através de uma rota específica, a rota sempre deve apontar para uma
classe controller e essa classe é o que vai encabeçar todo o processo, então as classes controllers elas basicamente contém a lógica de negócio
ou regras de negócio, para ele conseguir trabalhar com essa camada de dados ele conta com a ajuda da camada model, camada que basicamente vai
tratar diretamente com o banco de dados, vai chegar uma hora que você vai precisar expor esse dado pra alguém que fez a requisição nessa rota
então no momento que o controller recebe as informações do model ele precisa renderizar, executar um método que dado um dado vindo do model ele
retorna pra gente uma camada visual que normalmente vai ser um html ou json, essa camada visual normalmente roda um template engine, basicamente
é uma biblioteca que por exemplo transforma uma determinada marcação que você colocar no seu texto/html em dados evitando com que você precise
concatenar informações, então essa camada de visualização ela não conhece os dados e não conhece a nossa rota, ela simplesmente vai receber as
informações que o controller passar
* Criando o Controller Customer Part.1 - 0902
- yarn add date-fns / npm install date-fns
* Criando o Controller Customer Part.2 - 0903
- yarn add yup / npm install yup
- a validação vamos fazer via uma lib chamada yup, uma biblioteca que valida não o banco de dados em si mas ela valida o schema do request body
então você monta um schema pra ela falando tudo o que o request body precisa ter e ela faz a validação
* Criando o Controller Contact - 0904