// Importação
// const express = require("express");
// Importando arquivo de rotas
// const routes = require("./routes");

// Formato de imports mais usual
import express from "express";

// Importando middlewares
// import authMiddleware from "./app/middlewares/auth";

// Importando as rotas
import routes from "./routes";

// Importando o nosso loader e como seu nome é index para importá-lo basta fazer da seguinte forma:
import "./database";

// Classe para conter a lógica
// Organizar todos os nossos arquivos em função de classe porque a própria arquitetura de uma classe sugere uma melhor
// organização o que é mais interessante do que deixar espalhado em funções
class App {
  constructor() {
    this.server = express();
    // Chamando os métodos
    this.middlewares();
    this.routes();
  }

  // Um middleware é uma camada que você adiciona entre o Express e a aplicação, realiza uma interceptação e vai fazer
  // uma lógica com base nela podendo aprovar para que a requisição passe para a próxima etapa ou não
  middlewares() {
    // Middleware que vai permitir trabalhar com json
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
    // Adicionando auth middleware
    // this.server.use(authMiddleware);
  }

  routes() {
    // Vai servir como se fosse um middleware que vai direcionar para os locais corretos
    this.server.use(routes);
  }
}

// Exportar
// Instanciando a classe App e exportando
// const app = new App();
// module.exports = app.server;
// De uma forma resumida
// module.exports = new App().server;

// Formato mais usual de exportação
export default new App().server;
