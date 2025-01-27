import "dotenv/config";

// Configuração do dialeto e das credenciais de acesso ao banco de dados Postgres
module.exports = {
  dialect: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamp: true, // Cria duas colunas: createdAt e updatedAt
    underscored: true, // Troca a nomenclatura de camelCase para _, exemplo: customersGroup -> customers_group
    underscoredAll: true // Para as demais configurações como nome de colunas, chave estrangeira
  },
};
