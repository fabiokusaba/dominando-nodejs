// Importação
// const express = require("express");
// Importando arquivo de rotas
// const routes = require("./routes");

// Quando chamamos o import dotenv/config ele vai recuperar as variáveis de ambiente do arquivo .env ou do seu
// próprio computador e ele vai permitir utilizar depois
import "dotenv/config";

// Formato de imports mais usual
import express from "express";

// Importando sentry
import * as Sentry from "@sentry/node";

// Import responsável por fazer um retorno melhor do erro
import Youch from "youch";
import "express-async-errors";

// Importando middlewares
// import authMiddleware from "./app/middlewares/auth";

// Importando as rotas
import routes from "./routes";

// Importando o nosso loader e como seu nome é index para importá-lo basta fazer da seguinte forma:
import "./database";

// Importando configuração do sentry
import sentryConfig from "./config/sentry";

// Classe para conter a lógica
// Organizar todos os nossos arquivos em função de classe porque a própria arquitetura de uma classe sugere uma melhor
// organização o que é mais interessante do que deixar espalhado em funções
class App {
  constructor() {
    this.server = express();

    // Inicializando o sentry logo depois da gente criar o server
    Sentry.init(sentryConfig);

    // Chamando os métodos
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  // Um middleware é uma camada que você adiciona entre o Express e a aplicação, realiza uma interceptação e vai fazer
  // uma lógica com base nela podendo aprovar para que a requisição passe para a próxima etapa ou não
  middlewares() {
    // Antes de qualquer middleware nós chamamos o sentry
    this.server.use(Sentry.Handlers.requestHandler());

    // Middleware que vai permitir trabalhar com json
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
    // Adicionando auth middleware
    // this.server.use(authMiddleware);
  }

  routes() {
    // Vai servir como se fosse um middleware que vai direcionar para os locais corretos
    this.server.use(routes);

    // Logo após nas rotas nós também chamamos o sentry
    this.server.use(Sentry.Handlers.errorHandler());
  }

  // E para permitir fazer um tratamento de errors decente aqui dentro da aplicação a gente vai capturar esses errors
  // utilizando o conceito de middlewares
  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      // Primeira coisa, quando for ambiente de desenvolvimento a gente vai mostrar todas as informações detalhadas com
      // Youch, se não a gente simplesmente vai retornar um erro sem detalhe nenhum
      if (process.env.NODE_ENV === "development") {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: "Internal server error" });
    });
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
