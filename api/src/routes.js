// Importando o sistema de rotas do Express
// const { Router } = require("express");

// Formato mais usual de importação
import { Router } from "express";

// Importando o multer e a configuração
import multer from "multer";
import multerConfig from "./config/multer";

// Importando middleware auth
import auth from "./app/middlewares/auth";

// Importando o módulo CustomersController que trata das nossas requisições
import customers from "./app/controllers/CustomersController";
// Importando ContactsController
import contacts from "./app/controllers/ContactsController";
// Importando UsersController
import users from "./app/controllers/UsersController";
// Importando SessionsController
import sessions from "./app/controllers/SessionsController";
// Importando FilesControlller
import files from "./app/controllers/FilesController";

// Criando uma variável routes -> constante de classe
const routes = new Router();

// Criando uma constante que basicamente é o objeto multer instanciado com as suas configurações
const upload = multer(multerConfig);

// Rotas Sessions - autenticação
routes.post("/sessions", sessions.create);

// Vamos deixar a sessions livre e colocar o middleware nas demais rotas
routes.use(auth);

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

// Rotas Users
routes.get("/users", users.index);
routes.get("/users/:id", users.show);
routes.post("/users", users.create);
routes.put("/users/:id", users.update);
routes.delete("/users/:id", users.destroy);

// Rotas Files
routes.post("/files", upload.single("file"), files.create);

// Exportando
// module.exports = routes;

// Formato de exportação mais usual
export default routes;
