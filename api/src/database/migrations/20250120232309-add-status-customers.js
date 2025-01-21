'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("customers", "status", {
      type: Sequelize.ENUM("ACTIVE", "ARCHIVED"),
      allowNull: false,
      defaultValue: "ACTIVE",
    });
  },

  down: queryInterface => {
    // Executando comandos sql -> transação é um processo no banco de dados que só é concluído quando todos os outros comandos deram certo
    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.removeColumn("customers", "status", { transaction });
      await queryInterface.sequelize.query("DROP TYPE enum_customers_status", { transaction });
    });
  }
};
