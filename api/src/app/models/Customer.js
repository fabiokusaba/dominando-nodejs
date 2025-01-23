// Classe responsável pela manipulação da nossa tabela no banco de dados
import Sequelize, { Model, Op } from "sequelize";

class Customer extends Model {
  // Método init -> vai ser chamado pelo Sequelize
  static init(sequelize) {
    super.init({
      // Definindo configurações -> campos do modelo
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      status: Sequelize.ENUM("ACTIVE", "ARCHIVED"),
    }, {
      // Criando um escopo
      scopes: {
        // Ativos - nome do escopo: active
        active: {
          // Aqui dentro eu coloco qual é o pré requisito para ela ser uma active, basicamente vamos escrever o where aqui dentro
          where: {
            status: "ACTIVE",
          },
          order: ["createdAt"],
        },
        samurai: {
          where: {
            name: "Dev Samurai",
          },
        },
        created(date) {
          return {
            where: {
              createdAt: {
                [Op.gte]: date,
              },
            },
          };
        }
      },
      sequelize,
    });
  }

  static associate(models) {
    this.hasMany(models.Contact);
  }
}

export default Customer;
