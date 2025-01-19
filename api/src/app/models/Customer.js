// Classe responsável pela manipulação da nossa tabela no banco de dados
import Sequelize, { Model } from "sequelize";

class Customer extends Model {
  // Método init -> vai ser chamado pelo Sequelize
  static init(sequelize) {
    super.init({
      // Definindo configurações -> campos do modelo
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      status: Sequelize.ENUM("ACTIVE", "ARCHIVED"),
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.hasMany(models.Contact);
  }
}

export default Customer;
