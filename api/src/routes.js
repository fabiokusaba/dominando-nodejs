// Importando o sistema de rotas do Express
// const { Router } = require("express");

// Formato mais usual de importação
import { Router } from "express";

// Importando o módulo CustomersController que trata das nossas requisições
import customers from "./app/controllers/CustomersController";

// Criando uma variável routes -> constante de classe
const routes = new Router();

// Rotas
routes.get("/customers", customers.index);
routes.get("/customers/:id", customers.show);
routes.post("/customers", customers.create);
routes.put("/customers/:id", customers.update);
routes.delete("/customers/:id", customers.destroy);

// Exportando
// module.exports = routes;

// Formato de exportação mais usual
export default routes;