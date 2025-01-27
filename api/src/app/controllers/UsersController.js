import * as Yup from "yup";
import {Op} from "sequelize";
import {parseISO} from "date-fns";

import User from "../models/User";
// import Mail from "../../lib/Mail";

// Quando queremos processar uma fila a gente precisa importar o job e a queue
import Queue from "../../lib/Queue";
import DummyJob from "../jobs/DummyJob";
import WelcomeEmailJob from "../jobs/WelcomeEmailJob";

class UsersController {
  async index(req, res) {
    const {
      name,
      email,
      createdBefore,
      createdAfter,
      updatedBefore,
      updatedAfter,
      sort
    } = req.query;

    const page = req.query.page || 1;
    const limit = req.query.limit || 25;

    let where = {};
    let order = [];

    if (name) {
      where = {
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

    const data = await User.findAll({
      // Removendo da exibição o password e password_hash
      attributes: { exclude: ["password", "password_hash"] },
      where,
      order,
      limit,
      offset: limit * page - limit,
    });

    return res.json(data);
  }

  async show(req, res) {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password", "password_hash"] },
    });

    if (!user) {
      return res.status(404).json();
    }

    const { id, name, email, createdAt, updatedAt } = user;

    return res.json({ id, name, email, createdAt, updatedAt });
  }

  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(8),
      // Campo de validação do Yup para confirmação de senha
      password_confirmation: Yup.string()
        .when("password", (password, field) => {
          // Se o campo password existir eu passo a olhar o field (passwordConfirmation), esse campo passa a ser
          // requirido e vou começar a olhar para a referência que temos no password, se não retorno o próprio field
          password ? field.required().oneOf([Yup.ref("password")]) : field;
        }),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Error on validate schema" });
    }

    // Como o método create vai retornar um usuário totalmente válido e não é interessante retornamos todos os campos
    // vamos utilizar da desestruturação de objetos para selecionar apenas os campos que queremos retornar
    const { id, name, email, file_id, createdAt, updatedAt } = await User.create(req.body);

    // No momento em que criamos um usuário vamos enviar um email
    // Mail.send({
    //   to: email,
    //   subject: "Bem vindo(a)!",
    //   text: `Olá ${name}, bem-vindo(a) ao nosso sistema!`,
    // });

    await Queue.add(DummyJob.key, { message: "Hello Jobs" });
    await Queue.add(WelcomeEmailJob.key, { name, email });

    return res.status(201).json({ id, name, email, file_id, createdAt, updatedAt });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      old_password: Yup.string().min(8),
      // Vou fazer uma validação condicional que se eu digitei o oldPassword o password precisa ser requerido porque
      // significa que estou querendo trocar de password e todas as vezes que você quer trocar de password você vai
      // pedir o password antigo para verificar se a pessoa que está trocando o password é a própria pessoa
      password: Yup.string()
        .min(8)
        .when("old_password", (old_password, field) => {
          // Basicamente se o oldPassword existir o campo field (password) passa a ser requerido, caso contrário passo
          // para frente
          old_password ? field.required() : field;
        }),
      // Agora o passwordConfirmation precisa sempre estar atrelado ao password então se existir o valor de password ele
      // passa a ser requerido e somente o único valor aceitável é o valor de referência do próprio campo password
      password_confirmation: Yup.string()
        .when("password", (password, field) => {
          password ? field.required().oneOf([Yup.ref("password")]) : field;
        }),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Error on validate schema" });
    }

    // Após as validações precisamos recuperar o objeto que estamos querendo editar
    const user = await User.findByPk(req.params.id);

    // Se não existir um usuário significa que eu não carreguei o usuário correto, o usuário não existe no banco
    if (!user) {
      return res.status(404).json();
    }

    // Agora preciso verificar se o usuário digitou a senha anterior correta que está salva dentro do atributo
    // oldPassword
    const { old_password } = req.body;

    // Fazendo a verificação que se o oldPassword não vir nulo e ele não ter uma resposta positiva do checkPassword
    // ou seja, se o checkPassword retornar falso retorno uma status/mensagem ao usuário
    if (old_password && !(await user.checkPassword(old_password))) {
      return res.status(401).json({ error: "Password does not match" });
    }

    // Se todas as validações passaram nos resta agora usar o método update para atualizar os dados do usuário
    const { id, name, email, file_id, createdAt, updatedAt } = await user.update(req.body);

    return res.status(200).json({ id, name, email, file_id, createdAt, updatedAt });
  }

  async destroy(req, res) {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json();
    }

    await user.destroy();

    return res.status(204).json();
  }
}

export default new UsersController();
