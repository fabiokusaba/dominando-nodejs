// Importando o sistema de rotas do Express
// const { Router } = require("express");

// Formato mais usual de importação
import { Router } from "express";

// Importando o módulo CustomersController que trata das nossas requisições
import customers from "./app/controllers/CustomersController";
// Importando ContactsController
import contacts from "./app/controllers/ContactsController";

// Criando uma variável routes -> constante de classe
const routes = new Router();

// Rotas Customers
routes.get("/customers", customers.index);
routes.get("/customers/:id", customers.show);
routes.post("/customers", customers.create);
routes.put("/customers/:id", customers.update);
routes.delete("/customers/:id", customers.destroy);

// Rotas Contacts
routes.get("/customers/:customerId/contacts", contacts.index);
routes.get("/customers/:customerId/contacts/:id", contacts.show);
routes.post("/customers/:customerId/contacts", contacts.create);
routes.put("/customers/:customerId/contacts/:id", contacts.update);
routes.delete("/customers/:customerId/contacts/:id", contacts.destroy);

// Exportando
// module.exports = routes;

// Formato de exportação mais usual
export default routes;
