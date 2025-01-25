// Importando a lib yup para validações
import * as Yup from "yup";

// Importando os operadores do sequelize
import { Op } from "sequelize";

// Importando o método parseISO da biblioteca date-fns que possibilita a gente ler datas e transformar em objetos
import { parseISO } from "date-fns";

// Importando o nosso modelo Customer que vai ser o objeto que vai interagir com os métodos do sequelize
import Customer from "../models/Customer";

// Importando o nosso modelo Contact
import Contact from "../models/Contact";

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
    // Criando todas as variáveis que a gente vai buscar para filtro em função do require query ou dos parâmetros de consulta
    const {
      name,
      email,
      status,
      createdBefore,
      createdAfter,
      updatedBefore,
      updatedAfter,
      sort
    } = req.query;

    // Filtros de página e limite
    const page = req.query.page || 1;
    const limit = req.query.limit || 25;

    // Montando os filtros para que a gente possa jogar no método findAll
    let where = {};
    let order = [];

    // Compondo a nossa variável where
    if (name) {
      where = {
        // Operador spread vai concatenar o objeto que temos aqui
        ...where,
        name: {
          [Op.iLike]: name,
        },
      };
    }

    if (email) {
      where = {
        ...where,
        email: {
          [Op.iLike]: email,
        },
      };
    }

    if (status) {
      where = {
        ...where,
        status: {
          [Op.in]: status.split(",").map(item => item.toUpperCase()),
        },
      };
    }

    if (createdBefore) {
      where = {
        ...where,
        createdAt: {
          [Op.gte]: parseISO(createdBefore),
        },
      };
    }

    if (createdAfter) {
      where = {
        ...where,
        createdAt: {
          [Op.lte]: parseISO(createdAfter),
        },
      };
    }

    if (updatedBefore) {
      where = {
        ...where,
        updatedAt: {
          [Op.gte]: parseISO(updatedBefore),
        },
      };
    }

    if (updatedAfter) {
      where = {
        ...where,
        updatedAt: {
          [Op.lte]: parseISO(updatedAfter),
        },
      };
    }

    if (sort) {
      order = sort.split(",").map(item => item.split(":"));
    }

    const data = await Customer.findAll({
      where,
      // Incluindo contatos
      include: [
        {
          model: Contact,
          attributes: ["id", "status"],
        }
      ],
      order,
      // Limitando os resultados para não deixar o banco de dados extremamente ocupado e tentar dar uma resposta mais rápida
      limit,
      offset: limit * page - limit,
    });

    return res.json(data);
  }

  // Recupera um customer
  async show(req, res) {
    const customer = await Customer.findByPk(req.params.id);

    // Fazendo uma verificação para caso não exista o customer
    if (!customer) {
        return res.status(404).json();
    }

    return res.json(customer);
  }

  // Cria um novo customer
  async create(req, res) {
    // Criando validações com Yup através de um schema, dentro do shape vamos construir as nossas validações de schema
    const schema = Yup.object().shape({
      // O que eu quero validar -> tipo do dado -> validação
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      status: Yup.string().uppercase(),
    });

    // Validar o schema com o req.body -> caso não seja válido preciso tomar algumas providências
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Error on validate schema" });
    }

    // O método create vai receber todos esses registros dentro do request body onde vai estar todo o json que vou passar
    // Chamando o método create do sequelize
    const customer = await Customer.create(req.body);
    return res.status(201).json(customer);
  }

  // Atualiza um customer
  async update(req, res) {
    // Aqui não vou ter o required porque pode ser que eu esteja atualizando apenas um campo, então coloco todos como
    // opcional e no momento que o usuário digitar o atributo que ela quer atualizar ele vai validar somente o formato
    // por exemplo no caso de name precisa ser uma string
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      status: Yup.string().uppercase(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Error on validate schema" });
    }

    // Da mesma forma que eu tenho no show eu preciso recuperar o customer com findByPk e verificar se ele existe antes
    // da gente rodar a atualização
    const customer = await Customer.findByPk(req.params.id);
    // Caso o customer não exista retorno um 404
    if (!customer) {
      return res.status(404).json();
    }

    // Para fazermos a atualização dentro do sequelize precisamos utilizar o método update passando o nosso req.body, ou
    // seja, ele vai aproveitar tudo que está dentro do request e vai jogar para dentro do customer
    await customer.update(req.body);

    // Retornando o customer que foi atualizado
    return res.json(customer);
  }

  // Exclui um customer
  async destroy(req, res) {
    // Vamos fazer o mesmo processo de recuperar um customer
    const customer = await Customer.findByPk(req.params.id);
    // Verificamos se esse customer existe
    if (!customer) {
      return res.status(404).json();
    }

    // Se ele existir podemos usar o método destroy para excluí-lo
    await customer.destroy();

    return res.status(204).json();
  }
}

// Exportando o módulo
// module.exports = new CustomersController();

// Formato mais usual de exportação
export default new CustomersController();
