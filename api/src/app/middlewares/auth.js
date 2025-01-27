// Importando o jwt
import jwt from "jsonwebtoken";

// Importando promisify
import { promisify } from "util";

// Importando auth config
import authConfig from "../../config/auth";

// Middleware responsável por verificar se o cabeçalho da requisição possui o password secret, se possuir eu deixo
// passar, caso contrário não
export default async (req, res, next) => {
  // Capturando o valor do header ou cabeçalho da requisição
  const authHeader = req.headers.authorization;

  // Primeiro precisamos verificar se o authHeader está presente, se ele não estiver presente retornamos um 401 e
  // uma mensagem ao usuário
  if (!authHeader) {
    return res.status(401).json({ error: "Token is not provided" });
  }

  // Agora precisamos extrair somente o token tirando o Bearer que vem junto a ele e podemos fazer isso através da
  // desconstrução de arrays
  const [, token ] = authHeader.split(" ");

  // Após extrair o token precisamos validar se ele está assinado corretamente
  try {
    // Primeiro precisamos decodificar esse token
    const decode = await promisify(jwt.verify)(token, authConfig.secret);

    // Passando para quem interessar qual é o id do usuário que está autenticado
    req.userId = decode.id;

    console.log({ decode });

    return next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }

  // Verificando se o conteúdo da variável existe e se tem um valor determinado
  // if (authHeader && authHeader === "secret") {
  //   return next();
  // }

  // Se ela não existir retorno unauthorized
  // return res.status(401).json({ error: "User not allowed to access this resource" });
};
