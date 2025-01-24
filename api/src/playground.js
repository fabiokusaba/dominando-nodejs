import { Op } from "sequelize";

import "./database";

import Customer from "./app/models/Customer";
import Contact from "./app/models/Contact";

class Playground {
  static async play() {
    // const customer = await Customer.findByPk(3);

    // const customer = await Customer.findOne();

    // const customers = await Customer.count(); // Conta o total de customers
    // const customers = await Customer.max("createdAt"); // Retorna a maior data
    // const customers = await Customer.min("createdAt"); // Retorna a menor data

    // const customers = await Customer.scope({ method: ["created", new Date(2025, 0, 22)] }).findAll({}

    // Misturando escopo não parametrizado com escopo de função
    // const customers = await Customer.scope([
    //   ["active"],
    //   { method: ["created", new Date(2025, 0, 22)] },
    // ]).findAll();

    // const customers = await Customer.scope(["active", "samurai"]).findAll({
    //   // attributes: ["id"],
    //   // attributes: {
    //   //   // include: [],
    //   //   exclude: ["status"],
    //   // },
    //   include: [{
    //     model: Contact,
    //     where: {
    //       status: "ACTIVE",
    //     },
    //     required: false,
    //   }],
    //   where: {
    //     // id: 3,
    //     // status: "ACTIVE",
    //     // Operador "OR"
    //     [Op.or]: {
    //       status: {
    //         // Igual a "ACTIVE"
    //         // [Op.eq]: "ACTIVE",
    //         // Diferente de "ACTIVE"
    //         // [Op.ne]: "ACTIVE",
    //         // Está em ["ACTIVE", "ARCHIVED"]
    //         [Op.in]: ["ACTIVE", "ARCHIVED"],
    //       },
    //       name: {
    //         // Começa com "test"
    //         [Op.like]: "test%",
    //       },
    //     },
    //     createdAt: {
    //       // Maior ou igual a data atual
    //       // [Op.gte]: new Date(),
    //       // Menor ou igual a data atual
    //       // [Op.lte]: new Date(),
    //       // Entre duas datas
    //       [Op.between]: [new Date(2025, 0, 19), new Date()],
    //     }
    //   },
    //   order: [["name", "DESC"], ["createdAt"]],
    //   limit: 25,
    //   offset: 25 * 1 - 25, // limit * page - limit
    // });

    // const customer = await Customer.create({
    //   name: "Supermercado Zazá",
    //   email: "suporte@zaza.com.br"
    // });

    // const customer = await Customer.findByPk(3);
    // console.log("Antes: ", JSON.stringify(customer, null, 2));
    //
    // const newCustomer = await customer.update({
    //   status: "ARCHIVED",
    // });
    // console.log("Depois: ", JSON.stringify(newCustomer, null, 2));

    // const customer = await Customer.findByPk(3);
    // await customer.destroy();

    const customer = await Customer.create({
      name: "Empresa 4",
      email: "contato@empresa4.com.br"
    });
  }
}

Playground.play();
