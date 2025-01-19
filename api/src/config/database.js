// Configuração do dialeto e das credenciais de acesso ao banco de dados Postgres
module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "postgres123",
  database: "dominando_nodejs",
  define: {
    timestamp: true, // Cria duas colunas: createdAt e updatedAt
    underscored: true, // Troca a nomenclatura de camelCase para _, exemplo: customersGroup -> customers_group
    underscoredAll: true // Para as demais configurações como nome de colunas, chave estrangeira
  },
};
