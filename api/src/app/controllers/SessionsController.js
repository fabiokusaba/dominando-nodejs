// Controller que vai ser responsável pela parte de autenticação e geração de tokens para o usuário
// Importando o model User
import User from "../models/User";

// Importando a biblioteca jwt
import jwt from "jsonwebtoken";

// Importando auth config
import authConfig from "../../config/auth";

class SessionsController {
  // Como o nosso controller vai receber esse pedido de autenticação via post então vamos criar o método create
  async create(req, res) {
    // Capturando os parâmetros do corpo da requisição
    const { email, password } = req.body;
    console.log(`${email} / ${password}`)

    // Primeiro precisamos verificar se esse email existe no banco de dados porque assim eu vou conseguir retornar
    // uma resposta se o usuário foi ou não encontrado
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Agora precisamos comparar o password que está no banco de dados com o password que o usuário está digitando
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Password does not match" });
    }

    // Depois de passar por todo esse processo ele vai nos responder com um token jwt
    const { id, name } = user;

    return res.json({
      user: {
        id, name, email
      },
      // Vamos passar pelo processo de assinar esse nosso pacote de payload/dados e fazemos isso através do método sign
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionsController();
