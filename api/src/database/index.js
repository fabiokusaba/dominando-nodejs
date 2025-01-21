// Carregando os models para dentro da aplicação
import Sequelize from "sequelize";

// Carregando a configuração
import config from "../config/database";

// Importando as classes modelos para preencher o nosso array
import Customer from "../app/models/Customer";
import Contact from "../app/models/Contact";
import User from "../app/models/User";

// Os modelos eu carrego dentro de um array
const models = [Customer, Contact, User];

// Classe de configuração responsável por executar o método init de cada modelo
class Database {
  // Método construtor que vai abrir uma conexão e essa conexão precisa de uma configuração
  constructor() {
    // Nesse momento que estou criando uma propriedade chamada connection que é um objeto Sequelize preciso passar a sua configuração
    this.connection = new Sequelize(config);

    // Chamando o método init para carregar os modelos
    this.init();

    // Chamando o método associate para fazer as associações entre os modelos
    this.associate();
  }

  // Chamando o init de cada modelo
  init() {
    // Agora vou iterar sobre o array de modelos através de um forEach chamando o seu método init e passando o objeto sequelize
    models.forEach(model => model.init(this.connection));
  }

  // Método de associação
  associate() {
    models.forEach(model => {
      // Verificando se o modelo tem o método de associação
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

// Exportando a classe
export default new Database();
