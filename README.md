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
* Criando o Controller User - 0905
- yarn add bcryptjs / npm install bcryptjs
* O que é um Middleware - 1001
- são funções com acesso às requisições, respostas e a próxima função, então imagine como se fosse uma pilha em que você controla essa pilha e
você pode acrescentar no meio dessa pilha, no lugar onde você quiser a sua função
- imagine uma situação em que você está recebendo uma requisição você tem um middleware que pode ser do próprio express, de terceiros ou até mesmo
o seu middleware que ele faz alguma coisa, no momento em que ele faz alguma coisa ele chama o next, função que autoriza para o próximo middleware
executar, o próximo middleware executa e assim você vai ter uma execução em cascata até chegar no seu controller
- então, os middlewares são essas funções que você pode inserir no meio do caminho da requisição até chegar no seu controller para que você possa
controlar ou executar algo no meio do caminho
* Criando um Middleware no Express - 1002
- Dentro do express temos dois tipos de middlewares: globais e locais. Os middlewares globais eles atuam antes da gente chegar na rota, ou seja, eles
são intermediários entre o acesso ao recurso e o recurso ser executado. Os middlewares locais você aponta em quais recursos você quer que o middleware
execute e ele executa
- Para mapearmos um middleware global dentro do express é muito fácil basta usarmos dentro do método use uma arrow function com os parâmetros req, res
e next, como comentamos um middleware só completa a execução quando ele chama o próximo (next) então precisamos fazer uso do next para que ele possa
chamar o próximo e assim continuar a execução
- Os middlewares locais são basicamente funções que você pode criar para atuar em rotas específicas porque, por exemplo, nem toda rota que você tiver
vai ter a questão de receber como parâmetro na query o name então podemos transformar em middlewares locais que basicamente é uma função, e para a gente
poder vincular a rota a função basta colocarmos o nome da função entre o nome da rota e o (req, res)
* Formas de se autenticar uma API - 1101
- a autenticação no caso de APIs consiste basicamente em limitar alguns recursos (controllers) do acesso de estranhos (público), então para permitir o
acesso a usuários específicos o método mais comum é usuário/senha e como uma API não possui "campos de digitação" é necessário repassar essas informações
utilizando algumas estratégias
- existem várias possibilidades de receber essa informação sendo as mais comuns: Basic Authentication, OAuth 1.0, OAuth 2.0, Token JWT
- então, imagine que você tem um aplicativo e você abre uma comunicação com um controller Sessions onde você vai fazer um post passando alguns dados em
formato json que basicamente seriam o email e a senha, a nossa API vai receber os dados fazer a verificação e devolver um token jwt caso a autenticação
tenha sido realizada com sucesso
- o token jwt basicamente é dividido em três partes: a primeira parte é a informação de headers como tipo de token, algoritmo, etc, a segunda parte são
os dados que são chamados de payload, e por fim a assinatura que se refere aos dados e também aos headers, ou seja, ela é a garantia de que caso algum 
dado tenha sido alterado ao longo do caminho/transição de dado entre o servidor e o aplicativo ele possa verificar e possa descartar essa informação
* Criando o token de autenticação - 1102
- yarn add jsonwebtoken / npm install jsonwebtoken
* Validando o token de autenticação na API - 1103
* Como funciona upload de arquivos e fotos - 1201
* Configurando o Multer - 1202
- yarn add multer / npm install multer
* Criando o Controller Files - 1203
* Configurando o Nodemailer e enviando emails no sistema - 1301
- yarn add nodemailer / npm install nodemailer
* Como funciona uma fila de execução - 1401
- vamos imaginar o envio de email como uma operação custosa para o nosso sistema, uma operação custosa é uma operação que demanda muito processador, e
essas atividades podem começar a se acumular dentro do servidor fazendo com que ele caia acontecendo o que chamamos de timeout, ou seja, ele demora tanto
para executar que o outro lado que chamou aquela operação acha que ele morreu e por isso ele dá falha de conexão/desistindo
- podemos lidar com essa situação delegando essa tarefa para um outro servidor especializado em executar tarefas e esse servidor vai empilhar em filas de
execução, então o tempo de resposta que a sua aplicação precisa ter é só o tempo de escrita dentro daquele banco de dados de fila de execução que aquele
outro processo vai fazer, é uma forma mais interessante de se trabalhar com processos pesados