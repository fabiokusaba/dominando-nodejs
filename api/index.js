// Requisitando o Express
const express = require("express");

// Instanciando o nosso servidor
const server = express();

// Habilitando JSON
server.use(express.json());

// Mock de customers
let customers = [
  { id: 1, name: "Dev Samurai", site: "http://devsamurai.com.br" },
  { id: 2, name: "Google", site: "http://google.com" },
  { id: 3, name: "UOL", site: "http://uol.com.br" }
];

// Rotas
// Verbos HTTP: GET, POST, PUT, DELETE
// Declaro a intenção, receber informações (GET), qual o nome da rota ("/hello"), função de resposta
// req: requisição (request) / res: resposta (response)
server.get("/hello", (req, res) => {
  // return res.send("<h1>Hello World</h1>");
  return res.json({
    title: "Hello World",
    message: "Olá, tudo bem?"
  });
});

// Parâmetros de consulta ou Query params: são usados no final da rota através do "?" passando o nome do parâmetro e valor
// localhost:3000/hello?nome=Fabio&idade=30, são parâmetros opcionais
server.get("/query", (req, res) => {
  // Desconstrução de objetos para parâmetros de query
  const { nome, idade } = req.query;
  return res.json({
    title: "Hello World",
    message: `Olá, ${nome} tudo bem?`,
    idade: idade
  });
});

// Parâmetros de rota ou Route params: estão integrados a rota e a rota vai responder ou não se tiver aquele parâmetro, são
// parâmetros obrigatórios -> localhost:3000/hello/Fabio
server.get("/route/:nome", (req, res) => {
  const nome = req.params.nome;
  return res.json({
    title: "Hello World",
    message: `Olá, ${nome} tudo bem com você?`
  });
});

// Listagem de todos os customers
server.get("/customers", (req, res) => {
  return res.json(customers);
});

// Recuperando dados de um customer em específico dado o seu id
server.get("/customers/:id", (req, res) => {
  // Transformando o valor textual em valor numérico
  const id = parseInt(req.params.id);
  // Resgatando o customer
  const customer = customers.find(item => item.id === id);
  // Construindo o status -> se o customer existir 200, se não 404
  const status = customer ? 200 : 404;
  // Mensagem de log -> contexto + detalhe da informação
  // JSON.stringify(): transforma um objeto para o formato json
  console.log("GET :: /customers/:id ", JSON.stringify(customer))
  // Retornando o nosso status e o customer
  return res.status(status).json(customer);
});

// Inserindo um novo customer
server.post("/customers", (req, res) => {
  // Recebendo os parâmetros de um customer
  const { name, site } = req.body;
  // Próximo id/registro
  const id = customers.length + 1;
  // Criando um novo customer
  const newCustomer = {id, name, site};
  // Inserindo o customer no nosso banco (lista)
  customers.push(newCustomer);
  // Retornando o status e o novo customer
  return res.status(201).json(newCustomer);
});

// Atualizando um customer específico
server.put("/customers/:id", (req, res) => {
  // Pegando o id e convertendo para um valor numérico
  const id = parseInt(req.params.id);
  // Recuperando os parâmetros recebidos no body da requisição
  const { name, site } = req.body;
  // Localizar o customer com o determinado id
  const index = customers.findIndex(item => item.id === id);
  // Calculando o status -> se o index >= 0 ? 200 : 404, para indicar se existe ou não
  const status = index >= 0 ? 200 : 404;
  // Atualizar os dados do customer com os valores recebidos
  if(index >= 0) {
    customers[index] = {id, name, site};
  }
  // Retornando uma resposta do servidor -> status e o customer atualizado
  res.status(status).json(customers[index]);
});

// Excluindo um customer da lista
server.delete("/customers/:id", (req, res) => {
  // Receber um id e converter para um valor numérico
  const id = parseInt(req.params.id);
  // Localizar o index
  const index = customers.findIndex(item => item.id === id);
  // Calcular o status
  const status = index >= 0 ? 200 : 404
  // Se o index >= 0 significa que achei esse customer em específico
  if(index >= 0) {
    // Removendo o customer
    // splice -> significa que ele vai remover um objeto numa posição específica
    customers.splice(index, 1);
  }
  // Retornando o status e um json vazio
  return res.status(status).json();
});

// Máquina local: 127.0.0.1 / localhost
// Portas clássicas para desenvolvimento: 3000, 5000, 8000, 8080
// Abrindo a conexão para um endereço, no caso local
server.listen(3000, () => {
  console.log("server is running on port: 3000");
});