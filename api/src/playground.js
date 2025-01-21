import { Op } from "sequelize";

import "./database";

import Customer from "./app/models/Customer";
import Contact from "./app/models/Contact";

class Playground {
  static async play() {
    // const customer = await Customer.findByPk(3);

    // const customer = await Customer.findOne();

    const customers = await Customer.findAll({
      // attributes: ["id"],
      // attributes: {
      //   // include: [],
      //   exclude: ["status"],
      // },
      include: [{
        model: Contact,
        where: {
          status: "ACTIVE",
        },
        required: false,
      }],
      where: {
        // id: 3,
        // status: "ACTIVE",
        // Operador "OR"
        [Op.or]: {
          status: {
            // Igual a "ACTIVE"
            // [Op.eq]: "ACTIVE",
            // Diferente de "ACTIVE"
            // [Op.ne]: "ACTIVE",
            // Está em ["ACTIVE", "ARCHIVED"]
            [Op.in]: ["ACTIVE", "ARCHIVED"],
          },
          name: {
            // Começa com "test"
            [Op.like]: "test%",
          },
        },
        createdAt: {
          // Maior ou igual a data atual
          // [Op.gte]: new Date(),
          // Menor ou igual a data atual
          // [Op.lte]: new Date(),
          // Entre duas datas
          [Op.between]: [new Date(2025, 0, 19), new Date()],
        }
      }
    });

    console.log(JSON.stringify(customers, null, 2));
  }
}

Playground.play();
