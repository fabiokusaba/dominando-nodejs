// Importando o nosso modelo Customer que vai ser o objeto que vai interagir com os métodos do sequelize
import Customer from "../models/Customer";

// Mock de dados
let customers = [
  { id: 1, name: "Dev Samurai", site: "http://devsamurai.com.br" },
  { id: 2, name: "Google", site: "http://google.com" },
  { id: 3, name: "UOL", site: "http://uol.com.br" }
];

// Criar uma classe e os métodos que vão responder a um tipo de chamada
class CustomersController {
  // Listagem dos customers
  async index(req, res) {
    const data = await Customer.findAll({
      // Limitando os resultados para não deixar o banco de dados extremamente ocupado e tentar dar uma resposta mais rápida
      limit: 1000,
    });

    return res.json(data);
  }

  // Recupera um customer
  show(req, res) {
    const id = parseInt(req.params.id);
    const customer = customers.find(item => item.id === id);
    const status = customer ? 200 : 404;

    console.debug("GET :: /customers/:id ", customer);

    return res.status(status).json(customer);
  }

  // Cria um novo customer
  create(req, res) {
    const { name, site } = req.body;
    const id = customers.length + 1;

    const newCustomer = { id, name, site };
    customers.push(newCustomer);

    return res.status(201).json(newCustomer);
  }

  // Atualiza um customer
  update(req, res) {
    const id = parseInt(req.params.id);
    const { name, site } = req.body;

    const index = customers.findIndex(item => item.id === id);
    const status = index >= 0 ? 200 : 404;

    if(index >= 0) {
      customers[index] = { id, name, site };
    }

    return res.status(status).json(customers[index]);
  }

  // Exclui um customer
  destroy(req, res) {
    const id = parseInt(req.params.id);
    const index = customers.findIndex(item => item.id === id);
    const status = index >= 0 ? 200 : 404;

    if(index >= 0) {
      customers.splice(index, 1);
    }

    return res.status(status).json();
  }
}

// Exportando o módulo
// module.exports = new CustomersController();

// Formato mais usual de exportação
export default new CustomersController();
